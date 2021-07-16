const { body } = require("express-validator");

module.exports = () => {
  return [
    body("stars").isInt().notEmpty().escape().trim(),
    body("review").isString().notEmpty().escape().trim(),
    body("spoiler").isBoolean().notEmpty().escape().trim(),
  ];
};
