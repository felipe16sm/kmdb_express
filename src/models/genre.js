module.exports = (mongoose) => {
  const { Schema } = mongoose;

  const genreSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  });

  mongoose.model("Genre", genreSchema);

  return "Genre";
};
