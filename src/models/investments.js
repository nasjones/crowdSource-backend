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

	static async getById({ investmentId }) {
		const result = await db.query("SELECT * FROM investments where id = $1", [
			investmentId,
		]);

		const investment = result.rows[0];

		if (!investment)
			throw new NotFoundError(`No investment with id: ${investmentId}`);

		return investment;
	}
}

module.exports = Investments;
