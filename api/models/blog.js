const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  description: String,
  author: String,
  image: String,
});

module.exports = mongoose.model("Blog", blogSchema);
