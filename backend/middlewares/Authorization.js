const fs = require('fs')

const jwt = require("jsonwebtoken"); // importing jsonwebtoken

exports.Authorization = (req, res, next) => {
  let token = req.headers.authorization;

  try {
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
        if(req.file) { // deletes the users image
            fs.unlinkSync(req.file.path)
        }
      return res
        .status(400)
        .json({ status: false, message: "Session timed out!" });
    }
    res.locals.id = decodedToken.id;
    next();
  } catch (error) {
    if(req.file) { // deletes the users image
        fs.unlinkSync(req.file.path)
    }
    res.status(400).json({ status: false, message: "User Session Expired. Please login!" });
    // res.redirect("http://localhost:5500/login.html");
  }
};
