const db = require("../db");
const {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} = require("../expressError");
const User = require("./user");

class Products {
	static async create({ title, description, amountSought, username }) {
		await User.get(username);
		const result = await db.query(
			"INSERT INTO products (title, description,amount_sought) VALUES ($1, $2, $3)",
			[title, description, amountSought]
		);
		const product = result.rows[0];

		await db.query(
			"INSERT INTO product_creator (username, product_id) VALUES ($1, $2)",
			[username, product.id]
		);

		return product;
	}

	static async getById(productId) {
		const productResult = await db.query(
			"SELECT p.product_id, p.title, p.synopsis, p.description, p.amount_sought, concat_ws(' ', u.first_name, u.last_name) as full_name FROM products AS p INNER JOIN product_creator AS pc USING(product_id) INNER JOIN users AS u USING(username) WHERE product_id=$1",
			[productId]
		);

		const product = productResult.rows[0];

		if (!product) throw new NotFoundError(`No product with id: ${productId}`);

		const amountResult = await db.query(
			"SELECT SUM(amount) AS funded FROM investments WHERE product_id=$1",
			[productId]
		);
		const { funded } = amountResult.rows[0];

		return { ...product, funded: funded };
	}

	static async getAll() {
		const result = await db.query(
			"SELECT p.product_id, p.title, p.synopsis, p.amount_sought, concat_ws(' ', u.first_name, u.last_name) as full_name FROM products AS p INNER JOIN product_creator AS pc USING(product_id) INNER JOIN users AS u USING(username)"
		);

		const product = result.rows;

		if (!product) throw new NotFoundError(`No product with id: ${productId}`);

		return product;
	}
}

module.exports = Products;
