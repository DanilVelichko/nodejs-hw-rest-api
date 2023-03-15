const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../", "./tmp"));
  },
  filename: function (req, file, cb) {
    const [name, extension] = file.originalname.split(".");
    if (file) {
      cb(null, `${name}-${Date.now()}.${extension}`);
    } else {
      cb(new Error("No file provided"));
    }
  },
});
const upload = multer({ storage });

module.exports = upload;