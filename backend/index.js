const express = require("express"); // importing express module
const mongoose = require("mongoose"); // importing mongoose module
const cors = require("cors"); // importing cors module for coress browser resource sharing
const multer = require("multer"); // importing multer for attaching object payload to req.body
const fs = require("fs");
let path = require("path");
require("dotenv").config(); // initializing environment variable

const app = express(); //intializing express and assigning it to app variable

app.use(cors()); // initializing cors

app.use("/static", express.static("uploads")); // allows user navigate to backend folder uploads
app.use("/static/post", express.static("uploads_post")); // allows user navigate to backend folder uploads

app.use(express.json()); // for allowing json payloads
app.use(express.urlencoded({ extended: true })); // for all urlencoded payloads

const port = process.env.PORT || 4500; // assigning port number to server

// connect to databese
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(`Something went wrong: ${err}`));

const userRouter = require("./routes/User"); // user specific routes
const postRouter = require("./routes/Posts"); // user specific routes

// let getUser = async (req, res) => {
//   let allUser = await userModel.find({});
//   res.status(200).json({ status: true, data: allUser });
// };

app.use("/auth", userRouter); // handling user specific request
app.use("/post", postRouter); // handling post specific request

// app.get("/", getUser);

// starting server
app.listen(port, () => console.log(`Server listening on port ${port}`));
