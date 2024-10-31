
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    required: true,
    type: String 
  },
  content: {required: true, type: String},
  category: {required: true, type: mongoose.Schema.Types.ObjectId, ref: "Category"},
  author: {required: true, type: String},
  image: {type: String}
}, {
  timestamps: true
});

module.exports = mongoose.model("Post", postSchema);