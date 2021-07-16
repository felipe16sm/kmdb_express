const { Router } = require("express");

const router = Router();

module.exports = (app) => {
  const {
    isAuthenticatedOrReadOnly,
  } = require("../middlewares/permissions/authentication.permission");

  const { isUser } = require("../middlewares/permissions/user.permission");

  const { create, update } = require("../controllers/comment.controller");

  const { validate, commentValidations } = require("../middlewares/validators");

  app.use("/api/movies/:movie_id/review/", isAuthenticatedOrReadOnly);

  router.post(
    "/movies/:movie_id/comments/",
    commentValidations(),
    validate,
    isUser,
    create
  );

  router.put("/movies/:movie_id/comments/", isUser, update);

  app.use("/api", router);
};
