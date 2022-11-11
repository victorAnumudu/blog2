const express = require("express");

const router = express.Router();

const { postUpload } = require("../multer/Multer"); // multer storage config for user detail and post detail

const { emptyPost } = require("../middlewares/Posts");
const { Authorization } = require("../middlewares/Authorization");

const {
  handleCreatePost,
  handleGetPost,
  handleGetPostById,
  handleDeletePostById,
} = require("../controllers/Posts");

router.post(
  "/post",
  postUpload.single("image"),
  emptyPost,
  Authorization,
  handleCreatePost
);

router.get("/post", handleGetPost); // getting all post from database

router.get("/post/:id", Authorization, handleGetPostById); //get post by id

router.delete("/delete/:id", Authorization, handleDeletePostById);

module.exports = router;
