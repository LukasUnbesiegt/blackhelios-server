const { check } = require("express-validator");
const { User } = require("../models/users/User");

const alreadyEmailValidation = value => {
	return User.findOne({
		email: value
	}).then(mail => {
		if (mail) {
			console.log("happen");
			return Promise.reject("E-mail already in use");
		} else {
			return true;
		}
	});
};

module.exports = {
	alreadyEmailValidation
};
