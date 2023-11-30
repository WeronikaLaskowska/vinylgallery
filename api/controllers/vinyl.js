const Vinyl = require("../models/vinyl.js");
const path = require("path");
exports.vinyls_get_all = (req, res, next) => {
  Vinyl.find()
    .then((result) => {
      const vinylsWithImage = result.map((vinyl) => {
        return {
          ...vinyl._doc,
          image: vinyl.image ? path.basename(vinyl.image) : null,
        };
      });

      res.status(200).json({
        wiadomosc: "Vinyl list",
        info: vinylsWithImage,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.vinyls_add_new = (req, res, next) => {
  console.log(req);
  var vinyl = new Vinyl({
    artist: req.body.artist,
    type: req.body.type,
    name: req.body.name,
    year: req.body.year,
    score: req.body.score,
    description: req.body.description,
    genre: req.body.genre,
    image: req.file ? req.file.path : null, // Save the image path
  });

  vinyl
    .save()
    .then((savedVinyl) => {
      // Return the saved vinyl with the image path
      res.status(201).json({
        wiadomosc: "Vinyl added",
        info: savedVinyl,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
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
