const fs = require("fs");
const path = require("path");

//importing the database
const { postModel } = require("../models/Posts");
const { userModel } = require("../models/User");

exports.handleCreatePost = async (req, res) => {
  // const url =req.protocol +"://" +req.hostname +":" +4000 +"/static/post/" +req.file.filename;
  const url =
    req.protocol + "://" + req.hostname + "/static/" + req.file.filename;

  req.body.image = url;
  // user to add to database
  const userInfo = {
    title: req.body.title,
    description: req.body.description,
    user_id: res.locals.id,
    image: {
      //   data: fs.readFileSync("uploads/" + req.file.filename),
      data: req.body.image,
      contentType: "image/png",
    },
  };
  //   //insert into the database
  try {
    const user = await postModel.create(userInfo);
    if (!user) {
      if (req.file) {
        // deletes the users image
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ status: false, message: "Failed to post" });
    }
    res
      .status(200)
      .json({ status: true, message: "Post Created Successfully" });
  } catch (error) {
    if (req.file) {
      // deletes the users image
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};

exports.handleGetPost = async (req, res) => {
  let allPost;

  try {
    allPost = await postModel.find({});
    if (!allPost) {
      return res
        .status(500)
        .json({ status: false, message: "No records found" });
    }
    res.status(200).json({
      status: true,
      message: "Post retrieved successfully",
      post: allPost,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};

exports.handleDeletePostById = async (req, res) => {
  //gets the post by id from req.params
  const id = req.params.id;
  try {
    const deletedPost = await postModel.findByIdAndDelete(id);
    if (deletedPost) {
      let imagePath =
        deletedPost.image.data.split("/")[
          deletedPost.image.data.split("/").length - 1
        ];
      let imageLink = path.join("uploads_post", imagePath);

      fs.unlinkSync(imageLink); // delete post image from upload post folder
      res
        .status(200)
        .json({ status: true, message: "Post deleted successfully" });
    } else {
      res.status(404).json({ status: false, message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};

exports.handleGetPostById = async (req, res) => {
  const id = req.params.id;
  let post;

  try {
    post = await postModel.findById(id);
    if (!post) {
      return res
        .status(500)
        .json({ status: false, message: "No records found" });
    }
    res.status(200).json({
      status: true,
      message: "Post retrieved successfully",
      post: post,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};
