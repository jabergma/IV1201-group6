// Initialize Sequelize database:

"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};
// Extract the database information into an array:
const databases = Object.keys(config.databases);

/** Add Databases **/
for (let i = 0; i < databases.length; ++i) {
  let database = databases[i];
  let dbPath = config.databases[database];
  //console.log("dbPath: ", dbPath);
  db[database] = new Sequelize(
    dbPath.database,
    dbPath.username,
    dbPath.password,
    dbPath
  );
}

/** Add the Database Models **/
// Add models from database1 folder (Represents the new database)
fs.readdirSync(__dirname + "/../models/database1")
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname + "/../models/database1", file))(
      db.Database1,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Add models from database2 folder (Represents the old database)
fs.readdirSync(__dirname + "/../models/database2")
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname + "/../models/database2", file))(
      db.Database2,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;

module.exports = db;
