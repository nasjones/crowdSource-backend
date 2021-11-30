const db = require("../db");
const {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} = require("../expressError");
const sqlUpdate = require("../helpers/sql");
const User = require("./user");

class Products {
	static async create({ title, description, amountSought, username }) {
		await User.get(username);
		const result = db.query(
			"INSERT INTO products (title, description,amount_sought) VALUES ($1, $2, $3)",
			[title, description, amountSought]
		);
		const product = result.rows[0];

		db.query(
			"INSERT INTO product_creator (username, product_id) VALUES ($1, $2)",
			[username, product.id]
		);

		return product;
	}

	static async getById(productId) {
		const result = await db.query("SELECT * FROM products where id = $1", [
			productId,
		]);

		const product = result.rows[0];

		if (!product) throw new NotFoundError(`No product with id: ${productId}`);

		return product;
	}

	static async getAll() {
		const result = await db.query("SELECT p FROM products");

		const product = result.rows;

		if (!product) throw new NotFoundError(`No product with id: ${productId}`);

		return product;
	}
}

module.exports = Products;
