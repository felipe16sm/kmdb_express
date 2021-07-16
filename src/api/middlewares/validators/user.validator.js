const { body } = require("express-validator");

module.exports.createUser = () => {
  return [
    body("username").isString().notEmpty().escape().trim(),
    body("password").isString().notEmpty().escape().trim(),
    body("first_name").isString().notEmpty().escape().trim(),
    body("last_name").isString().notEmpty().escape().trim(),
    body("is_superuser").isBoolean().notEmpty().escape().trim(),
    body("is_staff").isBoolean().notEmpty().escape().trim(),
  ];
};

module.exports.loginUser = () => {
  return [
    body("username").isString().notEmpty().escape().trim(),
    body("password").isString().notEmpty().escape().trim(),
  ];
};
