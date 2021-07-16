const { Router } = require("express");

const router = Router();

module.exports = (app) => {
  const {
    isAuthenticatedOrReadOnly,
  } = require("../middlewares/permissions/authentication.permission");

  const { isCritic } = require("../middlewares/permissions/critic.permission");

  const { create, update } = require("../controllers/criticism.controller");

  const {
    validate,
    criticismValidations,
  } = require("../middlewares/validators");

  app.use("/api/movies/:movie_id/review/", isAuthenticatedOrReadOnly);

  router.post(
    "/movies/:movie_id/review/",
    criticismValidations(),
    validate,
    isCritic,
    create
  );

  router.put("/movies/:movie_id/review/", isCritic, update);

  app.use("/api", router);
};
