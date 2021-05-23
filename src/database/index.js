const Datastore = require("nedb-promises");
const { join } = require("path");
const file = join(__dirname, "..", "..", "db.json");
const datastore = Datastore.create({fileName: file, corruptAlertThreshold: 1 });

module.exports = datastore;
