const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  image: String
});

module.exports = mongoose.model("Listing", listingSchema);