const express = require("express");
const { checkUserOrAdmin } = require("../middleware/auth");
const User = require("../models/user");

const router = new express.Router();

router.get("/:username", checkUserOrAdmin, async function (req, res, next) {
	try {
		const user = await User.get(req.params.username);
		return res.json(user);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
