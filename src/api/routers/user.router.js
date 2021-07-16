const { Router } = require("express");

const router = Router();

module.exports = (app) => {
  const { create, login } = require("../controllers/user.controller");
  const { userValidations, validate } = require("../middlewares/validators");
  router.post("/accounts", userValidations.createUser(), validate, create);
  router.post("/login", userValidations.loginUser(), validate, login);

  app.use("/api", router);
};
