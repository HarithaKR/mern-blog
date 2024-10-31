const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Category", CategorySchema);