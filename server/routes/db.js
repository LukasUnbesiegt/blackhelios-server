const mongoose = require("mongoose");

module.exports = function() {
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);

  mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/server-dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("MONGODB RUNNING");
    })
    .catch(err => {
      console.log("CANNOT CONNECT MONGODB");
    });
};
