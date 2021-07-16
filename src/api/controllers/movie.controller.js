const { Movie, Genre, Critcism, Comment, User } = require("../../models");
const {
  createRetrieveMovieSerializer,
  listMovieSerializer,
} = require("../serializers/movie.serializer");

module.exports.list = async (req, res) => {
  movies = await Movie.find({});

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const { genres, criticism_set, comment_set } = movie;

    const genre_list = [];
    const criticism_set_list = [];
    const comment_set_list = [];

    for (let i = 0; i < genres.length; i++) {
      let genre = await Genre.findById(genres[i]);
      genre_list.push(genre);
    }

    movie.genres = genre_list;

    for (let i = 0; i < criticism_set.length; i++) {
      let criticism = await Critcism.findById(criticism_set[i]);
      let user = await User.findById(criticism["user"]["_id"]);
      criticism.user = user;
      criticism_set_list.push(criticism);
    }

    movie.criticism_set = criticism_set_list;

    for (let i = 0; i < comment_set.length; i++) {
      let comment = await Comment.findById(comment_set[i]);
      let user = await User.findById(comment["user"]["_id"]);
      comment.user = user;
      comment_set_list.push(comment);
    }

    movie.comment_set = comment_set_list;
  }

  res.send(listMovieSerializer(movies));
};

module.exports.create = async (req, res) => {
  const { title, duration, genres, launch, classification, synopsis } =
    req.body;
  try {
    const movie = await Movie.create({
      title,
      duration,
      launch,
      classification,
      synopsis,
    });

    for (let i = 0; i < genres.length; i++) {
      let genre = null;
      let findGenre = await Genre.findOne({ name: genres[i].name });
      if (!findGenre) {
        genre = await Genre.create(genres[i]);
      } else {
        genre = findGenre;
      }
      movie.genres.push(genre);
      genre.movies.push(movie);
      genre.save();
    }
    movie.save();

    return res.send(createRetrieveMovieSerializer(movie));
  } catch (exception) {
    return res.status(400).send({ error: exception.message });
  }
};

module.exports.retrieve = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const { genres, criticism_set, comment_set } = movie;

    const genre_list = [];
    const criticism_set_list = [];
    const comment_set_list = [];

    for (let i = 0; i < genres.length; i++) {
      let genre = await Genre.findById(genres[i]);
      genre_list.push(genre);
    }

    movie.genres = genre_list;

    for (let i = 0; i < criticism_set.length; i++) {
      let criticism = await Critcism.findById(criticism_set[i]);
      let user = await User.findById(criticism["user"]["_id"]);
      criticism.user = user;
      criticism_set_list.push(criticism);
    }

    movie.criticism_set = criticism_set_list;

    for (let i = 0; i < comment_set.length; i++) {
      let comment = await Comment.findById(comment_set[i]);
      let user = await User.findById(comment["user"]["_id"]);
      comment.user = user;
      comment_set_list.push(comment);
    }

    movie.comment_set = comment_set_list;

    return res.status(200).send(createRetrieveMovieSerializer(movie));
  } catch (exception) {
    return res.status(404).send({ detail: "Not found" });
  }
};

module.exports.destroy = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return res.status(404).send({ detail: "Not found" });
  }
  return res.status(204).send({});
};
