const fs = require('fs') // file system importation

//importing the database
const {userModel} = require("../models/User");

exports.emptyFields = (req, res, next) => {
  let error = []; // array to hold errors
  let requiredFields = []; // array to hold required fields
  let userInfo;
  if (req.path == "/signup") {
    requiredFields = ["name", "email", "password"];
    userInfo = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
  } else if (req.path == "/login") {
    requiredFields = ["email", "password"];
    userInfo = {
      email: req.body.email,
      password: req.body.password,
    };
  }
  //checking if any input is empty and updates the error array if such input is required
  for (let info in userInfo) {
    if (userInfo[info] == "" && requiredFields.includes(info)) {
      error.push(`${info} is required`);
    }
  }
  if (error.length > 0) {
    if(req.file) {
        fs.unlinkSync(req.file.path)
    }
    return res.status(400).json({ status: false, message: error.join(", ") });
  }
//   res.locals.userDetails = {...req.body, ...req.file};
  next();
};

exports.userExist = async (req, res, next) => {
  let { email } = req.body
  try {
    const userExist = await userModel.findOne({ email });
    //checking to see if such user is in the database already
    if (req.path == "/signup") { //what happens when the path is signup
        if(userExist){
            if(req.file) { // deletes the users image
                fs.unlinkSync(req.file.path)
            }
            return res.status(400).json({ status: false, message: 'Opps! User exists' });
        }
        next()
    }else{ // whats happens in event of any other path
        if(!userExist){
            if(req.file) { // deletes the users image
                fs.unlinkSync(req.file.path)
            }
            return res.status(400).json({ status: false, message: 'Opps! User Does not exists' });
        }
        res.locals.user = userExist
        next()
    }
    
  } catch (error) {
    if(req.file) { // deletes the users image
        fs.unlinkSync(req.file.path)
    }
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};
