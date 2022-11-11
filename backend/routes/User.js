const express = require("express");

const router = express.Router();

const { Authorization } = require("../middlewares/Authorization");

const { userDetailUpload } = require("../multer/Multer"); // multer storage config for user detail and post detail

const { emptyFields, userExist } = require("../middlewares/User");
const {
  handleSignup,
  handleLogin,
  handleGetUser,
} = require("../controllers/User");

router.post("/login", emptyFields, userExist, handleLogin);

router.post(
  "/signup",
  userDetailUpload.single("image"),
  emptyFields,
  userExist,
  handleSignup
);

router.get("/user", Authorization, handleGetUser); // router to get single user

module.exports = router;
