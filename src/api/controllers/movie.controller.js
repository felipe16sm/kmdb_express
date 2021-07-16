const { Movie, Genre, Critcism, Comment } = require("../../models");
const {
  createRetrieveMovieSerializer,
  listMovieSerializer,
} = require("../serializers/movie.serializer");

module.exports.list = async (req, res) => {
  movies = await Movie.find({});
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
    return res.send(createRetrieveMovieSerializer(movie));
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

// module.exports.update = async (req, res) => {
//   const book = await Book.findOneAndReplace({ _id: req.params.id }, req.body, {
//     new: true,
//   });

//   if (!book) {
//     res.status(404).send({ error: "Not found" });
//   }

//   res.send(book);
// };

// module.exports.partialUpdate = async (req, res) => {
//   const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   if (!book) {
//     res.status(404).send({ error: "Not found" });
//   }

//   res.send(book);
// };
