const fs = require("fs"); // file system importation

exports.emptyPost = (req, res, next) => {
  let error = []; // array to hold errors
  let requiredFields = ["title", "description", 'image']; // array to hold required fields
  userInfo = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
  };

  //checking if any input is empty and updates the error array if such input is required
  for (let info in userInfo) {
    if (userInfo[info] == "" && requiredFields.includes(info)) {
      error.push(`${info} is required`);
    }
  }
  if (error.length > 0) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ status: false, message: error.join(", ") });
  }
  //   res.locals.userDetails = {...req.body, ...req.file};
  next();
};
