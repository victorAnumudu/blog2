const fs = require("fs");

//importing the database
const { userModel } = require("../models/User");

const bcrypt = require("bcryptjs"); // importing bcryptjs
const jwt = require("jsonwebtoken"); // importing jsonwebtoken
const { userInfo } = require("os");
// const { userInfo } = require("os");

exports.handleSignup = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password); // hashing user password
  const url =
    req.protocol +
    "://" +
    req.hostname +
    ":" +
    4000 +
    "/static/" +
    req.file.filename;
  req.body.image = url;
  // user to add to database
  const userInfo = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: {
      //   data: fs.readFileSync("uploads/" + req.file.filename),
      data: req.body.image,
      contentType: "image/png",
    },
  };

  //   //insert into the database
  try {
    const user = await userModel.create(userInfo);
    if (!user) {
      if (req.file) {
        // deletes the users image
        fs.unlinkSync(req.file.path);
      }
      return res
        .status(500)
        .json({ status: false, message: "Failed to create user" });
    }
    res
      .status(200)
      .json({ status: true, message: "User Created Successfully" });
  } catch (error) {
    if (req.file) {
      // deletes the users image
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};

exports.handleLogin = async (req, res) => {
  let user = res.locals.user;

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    // comparing to see if user password does not match
    return res
      .status(400)
      .json({ status: false, message: "User password/email " });
  }

  //proceed if the password matched
  let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  res.status(200).json({ status: true, message: "Logging user in", token });
};

exports.handleGetUser = async (req, res) => {
  let userId = res.locals.id;

  try {
    userInfo = await userModel.findById(userId);
    if (!userInfo) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    res.status(200).json({
      status: true,
      message: {
        name: userInfo.name,
        email: userInfo.email,
        image: userInfo.image.data,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong!" });
  }
};
