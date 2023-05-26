const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photos: {
    type: [String], // Updated to array type
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  }
});

const events = mongoose.model("events", eventSchema);

module.exports = events;