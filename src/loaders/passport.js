const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("../config/passport");

const { User } = require("../models");

module.exports = (passport) => {
  const options = {};

  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  options.secretOrKey = config.passport.secret;

  const strategy = new Strategy(options, async (payload, done) => {
    const user = await User.findOne({ username: payload.username });

    if (!user) return done({ error: "Failed to load user" }, false);

    return done(null, {
      id: user._id,
      username: user.username,
      is_superuser: user.is_superuser,
      is_staff: user.is_staff,
    });
  });

  passport.use(strategy);
};
