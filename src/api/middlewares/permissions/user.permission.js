module.exports.isUser = (req, res, next) => {
  const { is_superuser, is_staff } = req.user;

  if (is_staff || is_superuser) {
    return res
      .status(403)
      .send({ detail: "You do not have permission to perform this action." });
  }

  return next();
};
