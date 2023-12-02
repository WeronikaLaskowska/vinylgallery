const Vinyl = require("../models/vinyl.js");
const path = require("path");

exports.vinyls_get_all = (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Get the page parameter or default to 1
  const limit = parseInt(req.query.limit) || 10; // Get the limit parameter or default to 10

  let totalItems = 0;

  Vinyl.countDocuments()
    .then((count) => {
      totalItems = count;

      return Vinyl.find()
        .skip((page - 1) * limit) // Skip records based on page number and limit
        .limit(limit); // Limit the number of records per page
    })
    .then((result) => {
      const vinylsWithImage = result.map((vinyl) => {
        return {
          ...vinyl._doc,
          image: vinyl.image ? path.basename(vinyl.image) : null,
        };
      });

      res.status(200).json({
        message: "Vinyl list",
        info: vinylsWithImage,
        page: page,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
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
  console.log("Updated Vinyl:", req);

  // Construct the updated vinyl object based on the request body
  const updatedVinyl = {
    artist: req.body.artist,
    type: req.body.type,
    name: req.body.name,
    year: req.body.year,
    score: req.body.score,
    description: req.body.description,
    genre: req.body.genre,
  };

  // Check if there's a new image to update
  if (req.file) {
    console.log("New Image Path:", req.file.path);
    updatedVinyl.image = req.file.path; // Assign the new image path
  }
  Vinyl.findByIdAndUpdate(id, updatedVinyl, { new: true })
    .then((updatedDoc) => {
      if (!updatedDoc) {
        return res.status(404).json({ message: "Vinyl not found" });
      }
      res
        .status(200)
        .json({ message: "Changed vinyl " + id, info: updatedDoc });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
exports.vinyls_delete = (req, res, next) => {
  const id = req.params.id;
  Vinyl.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ wiadomosc: "Vinyl deleted by id: " + id });
    })
    .catch((err) => res.status(404).json(err));
};
