const createRetrieveMovieSerializer = (movie) => {
  const movieSerializer = {};
  movieSerializer["genres"] = [];

  movieSerializer["_id"] = movie["_id"];
  movieSerializer["title"] = movie["title"];
  movieSerializer["duration"] = movie["duration"];

  for (let i = 0; i < movie.genres.length; i++) {
    let genre = {};
    genre["_id"] = movie.genres[i]["_id"];
    genre["name"] = movie.genres[i]["name"];
    movieSerializer["genres"].push(genre);
  }

  movieSerializer["launch"] = movie["launch"];
  movieSerializer["classification"] = movie["classification"];
  movieSerializer["synopsis"] = movie["synopsis"];

  if (!movie["critcism_set"]) {
    movieSerializer["critcism_set"] = [];
  } else {
    movieSerializer["critcism_set"] = movie["critcism_set"];
  }

  if (!movie["comment_set"]) {
    movieSerializer["comment_set"] = [];
  } else {
    movieSerializer["comment_set"] = movie["comment_set"];
  }

  return {
    _id: movieSerializer._id,
    title: movieSerializer.title,
    duration: movieSerializer.duration,
    genres: movieSerializer.genres,
    launch: movieSerializer.launch,
    synopsis: movieSerializer.synopsis,
    critcism_set: [],
    comment_set: [],
  };
};

module.exports.createRetrieveMovieSerializer = createRetrieveMovieSerializer;

module.exports.listMovieSerializer = (movies) => {
  const movieListSerializer = [];

  for (let i = 0; i < movies.length; i++) {
    movieListSerializer.push(createRetrieveMovieSerializer(movies[i]));
  }

  return movieListSerializer;
};
