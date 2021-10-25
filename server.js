const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ Welcome: "Welcome to the Book Store App !" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running at port no ${PORT}`);
  });

  module.exports = app;
