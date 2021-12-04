const db = require("../db");
const {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} = require("../expressError");

class Investments {
	static async create({ username, productId, amount }) {
		const userResults = await db.query(
			"SELECT username FROM users WHERE username = $1",
			[username]
		);

		const user = userResults.rows[0];
		if (!user) throw new NotFoundError(`No user:${username}`);

		const productResult = await db.query(
			"SELECT product_id FROM products WHERE product_id=$1",
			[productId]
		);

		const product = productResult.rows[0];

		if (!product) throw new NotFoundError(`No product with id: ${productId}`);

		const result = await db.query(
			"INSERT INTO investments (username, product_id, amount) VALUES ($1, $2, $3)",
			[username, productId, amount]
		);
		console.log(result.rows[0]);
		return { message: `${amount} invested` };
	}
}

module.exports = Investments;
