const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

router.post("/login", async function (req, res, next) {
	try {
		const user = await User.authenticate(req.body);
		const token = createToken(user);
		return res.json({ token });
	} catch (err) {
		return next(err);
	}
});

router.post("/register", async function (req, res, next) {
	try {
		const newUser = await User.register({ ...req.body, isAdmin: false });
		const token = createToken(newUser);
		return res.json({ token });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
