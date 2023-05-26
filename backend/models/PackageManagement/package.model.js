const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packagename: {
    type: String,
    required: true,
  },
  packagedestination: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  accomodation: {
    type: String,
    required: true,
  },
  packageid: {
    type: String,
    required: true,
  },
  locationtype: {
    type: String,
    required: true,
  },
  numofdays: {
    type: String,
    required: true,
    },
  numofpassengers: {
    type: String,
    required: true,
  },
  totalprice: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  instructions: {
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
  },
  featured: {
    type: String,
    required: true,
  }
});

const packages = mongoose.model("packages", packageSchema);

module.exports = packages;