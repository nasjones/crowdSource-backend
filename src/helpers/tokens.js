const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/**
 * Creates a json web token for the user.
 *
 * @param {object} user
 *
 * @returns a json web token string
 */
function createToken(user) {
	console.assert(
		user.isAdmin !== undefined,
		"createToken passed a user without is admin property"
	);

	return jwt.sign(
		{ username: user.username, isAdmin: user.isAdmin || false },
		SECRET_KEY
	);
}
module.exports = { createToken };
