const express = require("express");
const http = require("http");
/**
 * INITIALIZING APP
 */
const app = express();

/**
 * IMPORTING API ROUTES
 * IMPORTING DB
 * IMPORTING JOBS
 */
require("./routes/index")(app);
require("./routes/db")();
require("./jobs/agenda");
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
  console.log("We forgot to handle a promise rejection here: ", promise);
  console.log(" The error was: ", error);
});
