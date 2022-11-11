const mongoose = require("mongoose"); // importing mongoose module

const postSchema = new mongoose.Schema({
  user_id: String,
  title: String,
  description: String,
  image: {
    data: String,
    contentType: String,
  },
  category: { default: "new", type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

exports.postModel = mongoose.model("PostDetails", postSchema);
