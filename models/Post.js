const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  tittle: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Posts", PostSchema);
