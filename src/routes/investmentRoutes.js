const express = require("express");
const Investments = require("../models/investments");

const router = new express.Router();

router.post("/", async function (req, res, next) {
	try {
		const investment = await Investments.create(req.body);
		return res.json(investment);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
