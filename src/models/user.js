module.exports = (mongoose) => {
  const { Schema } = mongoose;

  const userSchema = new Schema({
    username: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true },
    first_name: { type: Schema.Types.String, required: true },
    last_name: { type: Schema.Types.String, required: true },
    is_superuser: { type: Schema.Types.Boolean, required: true },
    is_staff: { type: Schema.Types.Boolean, required: true },
  });

  mongoose.model("User", userSchema);

  return "User";
};
