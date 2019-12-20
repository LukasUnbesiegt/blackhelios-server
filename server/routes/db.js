const mongoose = require("mongoose");

module.exports = function() {
  // initializing Fawn for future multiple transactions
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);
  // database connecting....

  mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/server-dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("MONGODB RUNNING");
    })
    .catch(err => {
      console.log("cannot connect to mongoDB");
    });
};
