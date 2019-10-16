const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const { User } = require("../../models/users/User");
const { alreadyEmailValidation } = require("../../validations/users");
const {
	register,
	login,
	auth,
	logout,
	fbLogin
} = require("../../controllers/user");
const { authMiddleware } = require("../../middleware/auth");

router.post(
	"/register",
	[
		//email must be an email
		body("email")
			.isEmail()
			.custom((value, { req }) => {
				return alreadyEmailValidation(value);
			}),
		// password must be at least 5 chars long
		body("password").isLength({ min: 5 })
	],
	register
);
router.post(
	"/login",
	[
		//email must be an email
		body("email").isEmail(),
		// password must be at least 5 chars long
		body("password").isLength({ min: 5 })
	],
	login
);
router.post("/fblogin", fbLogin);
router.get("/auth", authMiddleware, auth);
router.get("/logout", authMiddleware, logout);

module.exports = router;
