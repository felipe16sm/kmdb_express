module.exports.isCritic = (req, res, next) => {
  const { is_superuser, is_staff } = req.user;

  if (is_staff && !is_superuser) {
    return next();
  } else {
    return res
      .status(403)
      .send({ detail: "You do not have permission to perform this action." });
  }
};
