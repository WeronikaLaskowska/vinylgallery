const Car = require("../models/car.js");

exports.cars_get_all = (req, res, next) => {
  Car.find()
    .then((result) => {
      res.status(200).json({
        wiadomosc: "lista samochodów",
        info: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.cars_add_new = (req, res, next) => {
  var car = new Car({
    marka: req.body.marka,
    model: req.body.model,
    rok: req.body.rok,
  });
  car.save();
  res.status(201).json({
    wiadomosc: "dodanie nowego samochodu",
    info: car,
  });
};

exports.cars_get_by_id = (req, res, next) => {
  const id = req.params.id;
  Car.findById(id)
    .then((result) => {
      res.status(200).json({
        wiadomosc: "szczegóły samochodu o nr " + id,
        info: result,
      });
    })
    .catch((err) => res.status(404).json(err));
};

exports.cars_change = (req, res, next) => {
  const id = req.params.id;
  const nowySamochod = {
    marka: req.body.marka,
    model: req.body.model,
    rok: req.body.rok,
  };
  Car.findByIdAndUpdate(id, nowySamochod)
    .then(() => {
      res.status(200).json({ wiadomosc: "zmiana danych samochodu o nr " + id });
    })
    .catch((err) => res.status(404).json(err));
};

exports.cars_delete = (req, res, next) => {
  const id = req.params.id;
  Car.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ wiadomosc: "usunięto samochód o nr " + id });
    })
    .catch((err) => res.status(404).json(err));
};
