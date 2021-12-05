const express = require("express");
const Investments = require("../models/investments");
const { requireLogin } = require("../middleware/auth");
const router = new express.Router();
const { STRIPE_KEY } = require("../config");
const stripe = require("stripe")(STRIPE_KEY);
const User = require("../models/user");
const Products = require("../models/products");

router.post("/", requireLogin, async function (req, res, next) {
	try {
		const owner = await Products.getOwner(req.body.productId);
		const stripeId = await User.getStripe(owner.username);
		const amount = parseInt(req.body.amount) * 100;
		let tenPercent = amount * 0.1;
		tenPercent = tenPercent <= 2000 ? tenPercent : 2000;
		const intent = await stripe.paymentIntents.create({
			amount: amount,
			currency: "usd",
			application_fee_amount: tenPercent,
			automatic_payment_methods: {
				enabled: true,
			},
			transfer_data: {
				destination: stripeId.id,
			},
		});

		return res.json({ client_secret: intent.client_secret });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
