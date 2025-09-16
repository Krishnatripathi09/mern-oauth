const express = require("express");

const userRouter = express.Router();

userRouter.get("/user", (req, res) => {
  const user = req.user;
  console.log(user);
});
