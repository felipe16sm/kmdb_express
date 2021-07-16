const { body } = require("express-validator");

module.exports = () => {
  return [body("comment").isString().notEmpty().escape().trim()];
};
