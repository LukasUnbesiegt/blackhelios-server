const { User } = require("../models/users/User");
const UserService = require("../services/UserService");
const { validationResult } = require("express-validator");
const { isEmpty } = require("../utils/utils");
const register = function(req, res) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	} else {
		UserService.register(req.body)
			.then(user => {
				return res.status(200).send({
					user,
					success: true
				});
			})
			.catch(err => {
				return res.status(422).send({
					err: err,
					success: false
				});
			});
	}
};

const login = function(req, res) {
	const errors = validationResult(req);

	if (!isEmpty(errors.errors)) {
		return res.status(422).json({ errors: errors.array() });
	} else {
		UserService.login(req.body)
			.then(token => {
				return res.status(200).send({
					token: token,
					success: true
				});
			})
			.catch(err => {
				return res.status(422).send({
					err: err,
					success: false
				});
			});
	}
};

const fbLogin = function(req, res) {
	// TO-DO
	// what if user change email in facebook ??
	// check accessToken and it matches but no email , we would replace token and give access to it .
	UserService.fbLogin(req.body)
		.then(token => {
			res.send({ success: true, token: token });
		})
		.catch(err => {
			return res.json({
				success: false,
				err: err
			});
		});
};

const auth = function(req, res) {
	res.status(200).json({
		email: req.user.email,
		name: req.user.name,
		authType: "local"
	});
};

const logout = function(req, res) {
	UserService.logout(req.user, userData => {
		if (!isEmpty(userData.errors)) {
			return res.status(400).send(userData.errors);
		} else {
			res.status(200).send({ success: true });
		}
	});
};

module.exports = {
	logout,
	auth,
	fbLogin,
	register,
	login
};
