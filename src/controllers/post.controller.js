const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadImage = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  const file = req.file;

  const base64ImageFile = new Buffer.from(file.buffer).toString("base64");
  const caption = await generateCaption(base64ImageFile);
  const result = await uploadImage(file.buffer, `${uuidv4()}`);

  const post = await postModel.create({
    image: result.url,
    caption: caption,
    user: req.user._id,
  });

  return res.status(201).json({
    message: "Post Generates succesfully",
    result: post,
  });
}

module.exports = {
  createPostController,
};
