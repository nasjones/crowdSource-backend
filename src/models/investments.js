const db = require("../db");
const {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} = require("../expressError");
const User = require("../models/user");
const Products = require("../models/products");

class Investments {
	static async create({ username, productId, amount }) {
		await User.get(username);
		await Products.get(productId);

		const result = await db.query(
			"INSERT INTO investments (username, product_id, amount) VALUES ($1, $2, $3)",
			[username, productId, amount]
		);

		return result.rows[0];
	}
}

module.exports = Investments;
