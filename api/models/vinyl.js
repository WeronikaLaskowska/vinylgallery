const mongoose = require("mongoose");

const vinylSchema = mongoose.Schema({
  artist: String,
  type: String,
  name: String,
  year: Number,
  score: Number,
  description: String,
  genre: String,
  image: String,
});

module.exports = mongoose.model("Vinyl", vinylSchema);
