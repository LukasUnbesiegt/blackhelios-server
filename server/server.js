const express = require("express");

/**
 * INITIALIZING APP
 */
const app = express();

/**
 * SOCKETIO IMPLEMENTATION
 */
var http = require("http").Server(app);
var io = require("socket.io")(http);
const redisAdapter = require("socket.io-redis");
io.adapter(redisAdapter({ host: "localhost", port: 6379 }));
//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("SOCKETIO WORK - CONNECT");
  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("SOCKETIO WORK - DISCONNECT");
  });
});

/**
 * IMPORTING API ROUTES
 * IMPORTING DB
 * IMPORTING JOBS
 */
require("./routes/index")(app, io);
require("./routes/db")();
require("./jobs/agenda");

module.exports = {
  app,
};

if (process.env.NODE_ENV !== "test") {
  http.listen(5000, () => {
    console.log("Boilerplate server at 5000");
  });
}

// error exceptions
process.on("uncaughtException", (error) => {
  console.log("Oh my god, something terrible happend: ", error);

  process.exit(1); // exit application
});
process.on("unhandledRejection", (error, promise) => {
  console.log("We forgot to handle a promise rejection here: ", promise);
  console.log(" The error was: ", error);
});
