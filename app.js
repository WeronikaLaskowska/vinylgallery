// import expresa
const express = require('express');

// importuję zmienne środowiskowe
require('dotenv').config();

// import mongoose
const mongoose = require('mongoose');
// połączenie z bazą
mongoose.connect(
  'mongodb+srv://' +
    process.env.DB_USERNAME +
    ':' +
    process.env.DB_PASSWORD +
    '@cluster0.re8z6.mongodb.net/cars?retryWrites=true&w=majority'
);

// instancja expresa
const app = express();

// uruchamiam logera
const morgan = require('morgan');
app.use(morgan('combined'));

// uruchamiam body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// routy
const carRoutes = require('./api/routes/cars');
const userRoutes = require('./api/routes/users');

app.use('/cars', carRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ wiadomosc: 'Nie odnaleziono' });
});

module.exports = app;
