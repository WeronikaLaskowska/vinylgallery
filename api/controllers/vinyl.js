const Vinyl = require("../models/vinyl.js");

exports.vinyls_get_all = (req, res, next) => {
  Vinyl.find()
    .then((result) => {
      res.status(200).json({
        wiadomosc: "Vinyl list",
        info: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.vinyls_add_new = (req, res, next) => {
  var vinyl = new Vinyl({
    artist: req.body.artist,
    type: req.body.type,
    name: req.body.name,
    year: req.body.year,
    score: req.body.score,
    description: req.body.description,
    genre: req.body.genre,
  });
  vinyl.save();
  res.status(201).json({
    wiadomosc: "Vinyl added",
    info: vinyl,
  });
};

exports.vinyls_get_by_id = (req, res, next) => {
  const id = req.params.id;
  Vinyl.findById(id)
    .then((result) => {
      res.status(200).json({
        wiadomosc: "Vinyl details by id: " + id,
        info: result,
      });
    })
    .catch((err) => res.status(404).json(err));
};

exports.vinyls_change = (req, res, next) => {
  const id = req.params.id;
  var vinyl = new Vinyl({
    artist: req.body.artist ?? undefined,
    type: req.body.type ?? undefined,
    name: req.body.name ?? undefined,
    year: req.body.year ?? undefined,
    score: req.body.score ?? undefined,
    description: req.body.description ?? undefined,
    genre: req.body.genre ?? undefined,
  });
  vinyl.save();
  Vinyl.findByIdAndUpdate(id, nowySamochod)
    .then(() => {
      res.status(200).json({ wiadomosc: "Changed vinyl  " + id });
    })
    .catch((err) => res.status(404).json(err));
};

exports.vinyls_delete = (req, res, next) => {
  const id = req.params.id;
  Vinyl.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ wiadomosc: "Vinyl deleted by id: " + id });
    })
    .catch((err) => res.status(404).json(err));
};
