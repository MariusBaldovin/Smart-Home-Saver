const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Define a route for testing purposes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//routes

module.exports = app;
