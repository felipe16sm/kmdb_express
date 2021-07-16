module.exports = (mongoose) => {
  const { Schema } = mongoose;
  const commentSchema = Schema({
    comment: { type: Schema.Types.String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  });

  mongoose.model("Comment", commentSchema);

  return "Comment";
};
