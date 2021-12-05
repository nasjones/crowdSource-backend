/**
 * General setup for application constants such as port and
 * work factor that will be used throughout the application
 */

require("dotenv").config();

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || "test";
const WORK_FACTOR = NODE_ENV === "test" ? 1 : 12;
const SECRET_KEY = process.env.SECRET_KEY || "shhh";
const RETURN_URL = process.env.RETURN_URL || "http://localhost:3000/";
const REFRESH_URL =
	process.env.REFRESH_URL || "http://localhost:3000/paymentauth";
const STRIPE_KEY =
	process.env.STRIPE_KEY ||
	"sk_test_51JzQjnAy5vV2xzIS5SP6FbBtd471GHJD3ve217eqXsgWCvONMSvWrmesXk4lxMzQwrrfn8GzmQcAnPcnLs8yYP6T00hqFQAsc9";

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
	RETURN_URL,
	REFRESH_URL,
	STRIPE_KEY,
};
