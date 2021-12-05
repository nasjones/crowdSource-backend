const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { requireLogin, checkUserOrAdmin } = require("../middleware/auth");
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");
const { RETURN_URL, REFRESH_URL } = require("../config");
const stripe = require("stripe")(
	"sk_test_51JzQjnAy5vV2xzIS5SP6FbBtd471GHJD3ve217eqXsgWCvONMSvWrmesXk4lxMzQwrrfn8GzmQcAnPcnLs8yYP6T00hqFQAsc9"
);

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

router.get("/payment", requireLogin, async function (req, res, next) {
	try {
		const account = await stripe.accounts.create({
			country: "US",
			type: "express",
			capabilities: {
				card_payments: { requested: true },
				transfers: { requested: true },
			},
			business_type: "individual",
		});

		User.addStripe({ username: res.locals.user.username, id: account.id });

		const accountLink = await stripe.accountLinks.create({
			account: account.id,
			refresh_url: REFRESH_URL,
			return_url: RETURN_URL,
			type: "account_onboarding",
		});

		return res.json({ accountLink });
	} catch (err) {
		return next(err);
	}
});

router.get("/reauthpayment", checkUserOrAdmin, async function (req, res, next) {
	try {
		const account = User.getStripe(res.locals.user.username);

		const accountLink = await stripe.accountLinks.create({
			account: account.id,
			refresh_url: REFRESH_URL,
			return_url: RETURN_URL,
			type: "account_onboarding",
		});

		return res.json({ accountLink });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
