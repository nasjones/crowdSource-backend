require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const { authenticateJWT } = require("./middleware/auth");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/productRoutes");

const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(authenticateJWT);
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.use(function (err, req, res, next) {
	if (process.env.NODE_ENV !== "test") console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error: { message, status },
	});
});

module.exports = app;
