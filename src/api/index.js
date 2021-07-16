const bindUserRouter = require("./routers/user.router");
const bindMovieRouter = require("./routers/movie.router");
const bindCriticismRouter = require("./routers/criticism.router");
const bindCommentRouter = require("./routers/comment.router");

module.exports = (app) => {
  bindUserRouter(app);
  bindMovieRouter(app);
  bindCriticismRouter(app);
  bindCommentRouter(app);
};
