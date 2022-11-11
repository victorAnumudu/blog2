
const multer = require('multer')


const userDetailStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const uniquePrefix = `${Math.random() * Math.random() * Math.random()}`;
      cb(null, `${uniquePrefix}_${file.originalname}`);
      // cb(null, file.originalname);
    },
  });
  exports.userDetailUpload = multer({ storage: userDetailStorage }); // setting multer to use the above storage


  const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads_post");
    },
    filename: (req, file, cb) => {
      const uniquePrefix = `${Math.random() * Math.random() * Math.random()}`;
      cb(null, `${uniquePrefix}_${file.originalname}`);
      // cb(null, file.originalname);
    },
  });
  exports.postUpload = multer({ storage: postStorage }); // setting multer to use the above storage