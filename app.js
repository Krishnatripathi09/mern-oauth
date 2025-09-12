require("dotenv").config;
const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./auth");
const app = express();
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, () => {
  console.log("Server is listening on PORT 3000");
});

function isLoggedIn(req, res, next) {
  res.user ? next() : res.sendStatus(401);
}

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
  res.send("somwthing went Wrong...");
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send("Hello I am Protected Route!");
});

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});
