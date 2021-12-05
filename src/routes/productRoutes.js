const express = require("express");
const Products = require("../models/products");
const { requireLogin } = require("../middleware/auth");
const router = new express.Router();

router.get("/", async function (req, res, next) {
	try {
		const products = await Products.getAll();
		return res.json(products);
	} catch (err) {
		return next(err);
	}
});

router.get("/:id", async function (req, res, next) {
	try {
		const products = await Products.getById(req.params.id);
		return res.json(products);
	} catch (err) {
		return next(err);
	}
});

router.post("/", requireLogin, async function (req, res, next) {
	try {
		const products = await Products.create(req.body);
		return res.json(products);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
