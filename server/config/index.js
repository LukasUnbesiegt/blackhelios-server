/**
 * Some Config files or values want to store secret
 *
 */

if (process.env.NODE_ENV === "production") {
	module.exports = require("./production");
} else {
	module.exports = require("./dev");
}
