module.exports = (mongoose) => {
  const { Schema } = mongoose;

  const movieSchema = Schema({
    title: { type: Schema.Types.String, required: true },
    duration: { type: Schema.Types.String, required: true },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    launch: { type: Schema.Types.String, required: true },
    classification: { type: Schema.Types.Number, required: true },
    synopsis: { type: Schema.Types.String, required: true },
    criticism_set: [
      {
        type: Schema.Types.ObjectId,
        ref: "Critcism",
      },
    ],
    comment_set: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  });

  mongoose.model("Movie", movieSchema);

  return "Movie";
};
