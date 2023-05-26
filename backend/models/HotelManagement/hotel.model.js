const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rooms: {
    type: String,
    required: true,
  },
  cheapestprice: {
    type: String,
    required: true,
  },
  featured: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  }
});

const hotels = mongoose.model("hotels", hotelSchema);

module.exports = hotels;
