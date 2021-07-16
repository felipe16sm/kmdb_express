const { body } = require("express-validator");

module.exports = () => {
  return [
    body("title").isString().notEmpty().escape().trim(),
    body("duration").isString().notEmpty().escape().trim(),
    body("launch").isString().notEmpty().escape().trim(),
    body("classification").isInt().notEmpty().escape().trim(),
    body("synopsis").isString().notEmpty().escape().trim(),
  ];
};
