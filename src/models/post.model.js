const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  image: String,
  caption: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const postModel = mongoose.model("post", schema);

module.exports = postModel;
