const { Movie, Comment, User } = require("../../models");

const {
  createCommentSerializer,
} = require("../serializers/comment.serializer");

module.exports.create = async (req, res) => {
  const { comment } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const movie = await Movie.findById(req.params.movie_id);

    const commentObj = await Comment.create({
      comment,
      user,
      movie,
    });

    movie.comment_set.push(commentObj);
    movie.save();

    return res.send(createCommentSerializer(commentObj));
  } catch (exception) {
    return res.status(404).send({ detail: "Not found" });
  }
};

module.exports.update = async (req, res) => {
  const { comment_id, comment } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const movie = await Movie.findById(req.params.movie_id);
    const commentObj = await Comment.findById(comment_id);

    commentObj.comment = comment;
    commentObj.user = user;
    commentObj.movie = movie;
    commentObj.save();

    return res.send(createCommentSerializer(commentObj));
  } catch (exception) {
    return res.status(404).send({ detail: "Not found" });
  }
};
