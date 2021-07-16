module.exports = (mongoose) => {
  const { Schema } = mongoose;

  const critcismSchema = Schema({
    stars: { type: Schema.Types.Number, required: true },
    review: { type: Schema.Types.String, required: true },
    spoiler: { type: Schema.Types.Boolean, require: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  });

  mongoose.model("Critcism", critcismSchema);

  return "Critcism";
};
