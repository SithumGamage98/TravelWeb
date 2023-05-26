const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogtitle: {
    type: String,
    required: true,
  },
  blogdescription: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  bloggername: {
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

const bloggers = mongoose.model("bloggers", blogSchema);

module.exports = bloggers;
