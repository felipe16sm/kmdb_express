const createRetrieveMovieSerializer = (movie) => {
  const movieSerializer = {};
  movieSerializer["genres"] = [];
  movieSerializer["criticism_set"] = [];
  movieSerializer["comment_set"] = [];

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

  for (let i = 0; i < movie.criticism_set.length; i++) {
    let criticism = {};
    criticism["_id"] = movie.criticism_set[i]["_id"];
    criticism["critic"] = {};
    criticism["critic"]["_id"] = movie.criticism_set[i]["user"]["_id"];
    criticism["critic"]["first_name"] =
      movie.criticism_set[i]["user"]["first_name"];
    criticism["critic"]["last_name"] =
      movie.criticism_set[i]["user"]["last_name"];
    criticism["stars"] = movie.criticism_set[i]["stars"];
    criticism["review"] = movie.criticism_set[i]["review"];
    criticism["spoiler"] = movie.criticism_set[i]["spoiler"];
    movieSerializer["criticism_set"].push(criticism);
  }

  for (let i = 0; i < movie.comment_set.length; i++) {
    let comment = {};
    comment["_id"] = movie.comment_set[i]["_id"];
    comment["user"] = {};
    comment["user"]["_id"] = movie.comment_set[i]["user"]["_id"];
    comment["user"]["first_name"] = movie.comment_set[i]["user"]["first_name"];
    comment["user"]["last_name"] = movie.comment_set[i]["user"]["last_name"];
    comment["comment"] = movie.comment_set[i]["comment"];
    movieSerializer["comment_set"].push(comment);
  }

  return {
    _id: movieSerializer._id,
    title: movieSerializer.title,
    duration: movieSerializer.duration,
    genres: movieSerializer.genres,
    launch: movieSerializer.launch,
    synopsis: movieSerializer.synopsis,
    criticism_set: movieSerializer.criticism_set,
    comment_set: movieSerializer.comment_set,
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
