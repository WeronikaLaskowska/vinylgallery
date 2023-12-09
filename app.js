const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@cluster0.cgduyz5.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();
app.use(cors());
const morgan = require("morgan");
app.use(morgan("combined"));
app.use("/uploads", express.static("uploads"));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded bodies

// routes
const vinylRoutes = require("./api/routes/vinyls");
const userRoutes = require("./api/routes/users");

app.use("/vinyls", vinylRoutes);
app.use("/users", userRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "404 Not found" });
});

module.exports = app;
