const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  marka: String,
  model: String,
  rok: Number,
});

module.exports = mongoose.model('Car', carSchema);
