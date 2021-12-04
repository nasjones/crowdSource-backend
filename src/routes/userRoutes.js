const express = require("express");
const { checkUserOrAdmin } = require("../middleware/auth");
const User = require("../models/user");

const router = new express.Router();

router.get("/", async function (req, res, next) {
	try {
		const users = await User.getAll();
		return res.json(users);
	} catch (err) {
		return next(err);
	}
});

router.get("/:username", checkUserOrAdmin, async function (req, res, next) {
	try {
		const user = await User.get(req.params.username);
		return res.json(user);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
