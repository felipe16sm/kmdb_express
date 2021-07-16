const { Router } = require("express");

const router = Router();

module.exports = (app) => {
  const {
    isAuthenticatedOrReadOnly,
  } = require("../middlewares/permissions/authentication.permission");

  const { isAdmin } = require("../middlewares/permissions/admin.permission");

  const {
    create,
    list,
    retrieve,
    destroy,
  } = require("../controllers/movie.controller");

  const { validate, movieValidations } = require("../middlewares/validators");

  app.use("/api/movies", isAuthenticatedOrReadOnly);

  router.post("/movies", movieValidations(), validate, isAdmin, create);
  router.get("/movies", list);
  router.get("/movies/:id", retrieve);
  router.delete("/movies/:id", isAdmin, destroy);

  app.use("/api", router);
};
