/**
 * Setup for connection to the database to export the database
 * and have access to queries via pg
 */
const { Client } = require("pg");
const { getDatabaseURI } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
	db = new Client({
		connectionString: getDatabaseURI(),
		ssl: { rejectUnauthorized: false },
	});
} else {
	db = new Client({
		connectionString: getDatabaseURI(),
	});
}

db.connect();

module.exports = db;
