const { EventEmitter } = require("events");

/**
 * EVENT EMITTER INSTANCE CREATION
 */

const eventEmitter = new EventEmitter();

/**
 * IMPORTING ALL LISTENERS
 * AND PASS eventEmitter object
 */
require("./userListeners")(eventEmitter);

module.exports = eventEmitter;
