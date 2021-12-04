const db = require("../db");
const {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} = require("../expressError");
const bcrypt = require("bcrypt");
const { WORK_FACTOR } = require("../config");
const sqlUpdate = require("../helpers/sql");
const Products = require("./products");
const Investments = require("./investments");

class User {
	static async register({
		username,
		password,
		firstName,
		lastName,
		email,
		isAdmin,
	}) {
		const duplicateCheck = await db.query(
			`SELECT username FROM users WHERE username = $1`,
			[username]
		);

		if (duplicateCheck.rows[0])
			throw new BadRequestError(`Username: ${username} already in use`);

		const hashedPassword = await bcrypt.hash(password, WORK_FACTOR);

		const result = await db.query(
			`INSERT INTO users
			 (username,
				password,
				first_name,
				last_name,
				email,
				is_admin)
			 VALUES ($1, $2, $3, $4, $5, $6)
			 RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
			[username, hashedPassword, firstName, lastName, email, isAdmin]
		);

		const user = result.rows[0];
		if (!user) throw new BadRequestError("Problem creating user");
		return user;
	}

	static async authenticate({ username, password }) {
		const result = await db.query(
			`SELECT username,
							password,
							first_name AS "firstName",
							last_name AS "lastName",
							email,
							is_admin AS "isAdmin"
			 FROM users
			 WHERE username = $1`,
			[username]
		);

		const user = result.rows[0];

		if (user) {
			const correct = await bcrypt.compare(password, user.password);

			if (correct === true) {
				delete user.password;
				return user;
			}
		}

		throw new UnauthorizedError("Invalid username/password");
	}

	static async get(username) {
		const userResults = await db.query(
			"SELECT username, first_name, last_name, email FROM users WHERE username = $1",
			[username]
		);

		const user = userResults.rows[0];

		if (!user) throw new NotFoundError(`No user:${username}`);

		const productResults = await db.query(
			"SELECT p.product_id, p.title FROM products AS p INNER JOIN product_creator AS pc USING(product_id) WHERE pc.username = $1",
			[username]
		);

		const products = productResults.rows;

		const investmentResults = await db.query(
			"SELECT i.amount, p.product_id, p.title FROM investments AS i INNER JOIN products AS p USING(product_id) WHERE i.username = $1",
			[username]
		);

		const investments = investmentResults.rows;

		return { ...user, products, investments };
	}

	static async invest({ username, productId, amount }) {
		await this.get(username);
		await Products.getById(productId);

		const investment = await Investments.create({
			username,
			productId,
			amount,
		});

		if (!investment) throw new BadRequestError("Problem sending your payment");

		return investment;
	}
}

module.exports = User;
