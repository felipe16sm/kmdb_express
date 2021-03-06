const { validationResult } = require("express-validator");

module.exports.userValidations = require("./user.validator");
module.exports.movieValidations = require("./movie.validator");
module.exports.criticismValidations = require("./criticism.validator");
module.exports.commentValidations = require("./comment.validator");

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  console.log(errors);
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
