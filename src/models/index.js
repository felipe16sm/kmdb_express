const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const basename = path.basename(__filename);

const config = require("../config/mongoose");

const db = {};

mongoose.connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const modelName = require(path.join(__dirname, file))(mongoose);
    db[modelName] = mongoose.model(modelName);
  });

module.exports = db;
