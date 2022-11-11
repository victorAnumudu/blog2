const mongoose = require("mongoose"); // importing mongoose module

const userSchema = new mongoose.Schema({
  name: String,
  email: { unique: true, type: String },
  password: String,
  image: {
    data: String,
    contentType: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

exports.userModel = mongoose.model("userDetails", userSchema);
