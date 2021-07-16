const express = require("express");
const PORT = 8000;
const app = express();
const applyPassportStrategy = require("./loaders/passport");
const passport = require("passport");

applyPassportStrategy(passport);

app.use(express.json());

const bindAPIRoutes = require("./api");

bindAPIRoutes(app);

app.listen(PORT, () => {
  console.log(`Listening on <http:localhost:${PORT}>`);
});
