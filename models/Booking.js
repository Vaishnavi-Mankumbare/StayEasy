const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  listingId: String,
  userEmail: String,
  date: String
});

module.exports = mongoose.model("Booking", bookingSchema);