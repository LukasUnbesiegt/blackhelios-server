const Agenda = require("agenda");
const connectionString = process.env.MONGO_URI;
// const JOB_TYPES = ["sample", "sample"];
const moment = require("moment");

const agenda = new Agenda({
  db: { address: connectionString, collection: "jobs" }
});

// JOB_TYPES.forEach(function(type) {
//   require("./" + type)(agenda);
// });

agenda.on("ready", async function() {
  agenda.start();
});
async function graceful() {
  await agenda.stop();
  process.exit(0);
}

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);
module.exports = agenda;
