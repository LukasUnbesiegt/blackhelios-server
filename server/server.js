const express = require("express");
const http = require("http");
const config = require("./config");
// *** express server initialization ***
const app = express();

// getting  third party  and api middlewares and routes
require("./routes/index")(app);
require("./routes/db")();
module.exports = {
	app
};
if (process.env.NODE_ENV !== "test") {
	app.listen(5000, () => {
		console.log("Boilerplate server at 5000");
	});
}

// error exceptions
process.on("uncaughtException", error => {
	console.log("Oh my god, something terrible happend: ", error);

	process.exit(1); // exit application
});
process.on("unhandledRejection", (error, promise) => {
	console.log(
		" Oh Lord! We forgot to handle a promise rejection here: ",
		promise
	);
	console.log(" The error was: ", error);
});
