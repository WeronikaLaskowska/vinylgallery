// import expresa
const express = require("express");

// importuję zmienne środowiskowe
require("dotenv").config();
const cors = require("cors");
// import mongoose
const mongoose = require("mongoose");
// połączenie z bazą

mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@cluster0.cgduyz5.mongodb.net/?retryWrites=true&w=majority"
);

// instancja expresa
const app = express();
// Enable CORS for all routes
app.use(cors());
// uruchamiam logera
const morgan = require("morgan");
app.use(morgan("combined"));
app.use("/uploads", express.static("uploads"));
// uruchamiam body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded bodies

// routy
const carRoutes = require("./api/routes/cars");
const vinylRoutes = require("./api/routes/vinyls");
const userRoutes = require("./api/routes/users");

app.use("/cars", carRoutes);
app.use("/vinyls", vinylRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ wiadomosc: "404 Not found" });
});

module.exports = app;
