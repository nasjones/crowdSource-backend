const db = require("../db");
const {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} = require("../expressError");
const User = require("./user");

class Products {
	static async create({
		title,
		description,
		amountSought,
		username,
		synopsis,
	}) {
		const userResults = await db.query(
			"SELECT username FROM users WHERE username = $1",
			[username]
		);

		const user = userResults.rows[0];
		if (!user) throw new NotFoundError(`No user:${username}`);

		const productResult = await db.query(
			"INSERT INTO products (title, description, amount_sought, synopsis) VALUES ($1, $2, $3, $4) RETURNING product_id AS id, title",
			[title, description, amountSought, synopsis]
		);

		const product = productResult.rows[0];

		await db.query(
			"INSERT INTO product_creator (username, product_id) VALUES ($1, $2)",
			[username, product.id]
		);

		return { message: `${product.title} created` };
	}

	static async getById(productId) {
		const productResult = await db.query(
			"SELECT p.product_id, p.title, p.synopsis, p.description, p.amount_sought, concat_ws(' ', u.first_name, u.last_name) as full_name FROM products AS p INNER JOIN product_creator AS pc USING(product_id) INNER JOIN users AS u USING(username) WHERE product_id=$1",
			[productId]
		);

		const product = productResult.rows[0];

		if (!product) throw new NotFoundError(`No product with id: ${productId}`);

		return product;
	}

	static async getAll() {
		const result = await db.query(
			"SELECT p.product_id, p.title, p.synopsis, p.amount_sought, concat_ws(' ', u.first_name, u.last_name) as full_name FROM products AS p INNER JOIN product_creator AS pc USING(product_id) INNER JOIN users AS u USING(username)"
		);

		const product = result.rows;

		if (!product) throw new NotFoundError(`No product with id: ${productId}`);

		return product;
	}

	static async getOwner(productId) {
		const result = await db.query(
			"SELECT username FROM product_creator WHERE product_id = $1",
			[productId]
		);
		const username = result.rows[0];

		if (!username)
			throw new NotFoundError(`No owner found for product id: ${productId}`);

		return username;
	}
}

module.exports = Products;
