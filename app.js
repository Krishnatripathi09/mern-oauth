const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("Server is listening on PORT 3000");
});

app.get("/protected", (req, res));

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});
