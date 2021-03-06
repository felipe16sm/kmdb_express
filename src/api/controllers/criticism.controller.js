const { Movie, Critcism, User } = require("../../models");
const {
  createCriticismSerializer,
} = require("../serializers/criticism.serializer");

module.exports.create = async (req, res) => {
  const { stars, review, spoiler } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const movie = await Movie.findById(req.params.movie_id);
    const findCriticism = await Critcism.find({ movie });

    if (findCriticism.length > 0) {
      return res.status(422).send({ detail: "You already made this review." });
    }

    const criticism = await Critcism.create({
      stars,
      review,
      spoiler,
      user,
      movie,
    });

    movie.criticism_set.push(criticism);
    movie.save();

    return res.send(createCriticismSerializer(criticism));
  } catch (exception) {
    return res.status(404).send({ detail: "Not found" });
  }
};

module.exports.update = async (req, res) => {
  const { stars, review, spoilers } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const movie = await Movie.findById(req.params.movie_id);
    const findCriticism = await Critcism.find({ movie, user });
    const criticism = findCriticism[0];
    criticism.stars = stars;
    criticism.review = review;
    criticism.spoilers = spoilers;
    criticism.user = user;
    criticism.movie = movie;
    console.log(criticism);
    criticism.save();

    return res.send(createCriticismSerializer(criticism));
  } catch (exception) {
    return res.status(404).send({ detail: "Not found" });
  }
};
