const eventEmitter = require("./event");

module.exports = function(eventEmitter) {
  eventEmitter.on("user_signup", user => {
    console.log("user", user);
  });
};
