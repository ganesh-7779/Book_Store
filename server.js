const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

const connection = require("./config/database.config");
connection.database();

app.get("/", (req, res) => {
  res.json({ Welcome: "Welcome to the Book Store App !" });
});
require("./routes/user.route")(app);
app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});

module.exports = app;
