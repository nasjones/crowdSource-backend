/**
 * General setup for application constants such as port and
 * work factor that will be used throughout the application
 */

require("dotenv").config();

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || "test";
const WORK_FACTOR = NODE_ENV === "test" ? 1 : 12;
const SECRET_KEY = process.env.SECRET_KEY || "shhh";

function getDatabaseURI() {
	return NODE_ENV === "test"
		? "crowdsource_test"
		: process.env.DATABASE_URL || "crowdsource";
}

module.exports = {
	PORT,
	NODE_ENV,
	WORK_FACTOR,
	SECRET_KEY,
	getDatabaseURI,
};
