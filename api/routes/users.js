const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const router = express.Router();

// zakładanie konta
router.post('/signup', (req, res, next) => {
  // TODO - sprawdzenie czy już przypadkiem nie ma takiego emaila
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() =>
        res.status(201).json({ wiadomosc: 'Poprawnie dodano użytkownika' })
      )
      .catch((err) => res.status(500).json(err));
  });
});

// logowanie
router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) return res.status(401).json({ wiadomosc: 'Błąd autoryzacji' });
    bcrypt.compare(req.body.password, user.password).then((result) => {
      if (result) {
        const token = jwt.sign({ email: user.email }, process.env.JWT_KEY, {
          expiresIn: '1h',
        });
        return res.status(200).json({
          wiadomosc: 'Poprawnie zalogowano',
          token: token,
        });
      } else return res.status(401).json({ wiadomosc: 'Błąd autoryzacji' });
    });
  });
});
module.exports = router;
