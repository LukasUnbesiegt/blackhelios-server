const mongoose = require("mongoose");

module.exports = function() {
	// initializing Fawn for future multiple transactions

	mongoose.set("useFindAndModify", false);
	mongoose.set("useCreateIndex", true);
	// database connecting....
	mongoose
		.connect(process.env.MONGO_URI || "mongodb://localhost:27017/hludann", {
			useNewUrlParser: true
		})
		.then(() => {
			console.log("mongoDB Up ");
		})
		.catch(err => {
			console.log("cannot connect to mongoDB");
		});
};
