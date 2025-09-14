require("dotenv").config;
const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./auth");

const app = express();

const PORT = 3000;

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("something went Wrong...");
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy();
  res.send("GoodBye :)");
});

app.listen(PORT, () => {
  console.log("Server is listening on PORT 3000");
});
