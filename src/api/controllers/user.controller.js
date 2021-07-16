const { User } = require("../../models");
const config = require("../../config/passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.create = async (req, res) => {
  let { username, password, first_name, last_name, is_superuser, is_staff } =
    req.body;

  password = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const user = await User.create({
    username,
    password,
    first_name,
    last_name,
    is_superuser,
    is_staff,
  });

  res.status(201).send({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    is_superuser: user.is_superuser,
    is_staff: user.is_staff,
  });
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(401).send({ error: "Invalid username or password" });
  }

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (validatePassword) {
    const token = jwt.sign({ username: user.username }, config.passport.secret);
    return res.send({ token });
  }
  return res.status(401).send({ message: "Invalid passowrd" });
};
