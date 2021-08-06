const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const validator = require("../validator");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

var upload = multer({ storage: storage });

const router = express.Router();
router.post(
  "/signup",
  upload.single("profileImage"),
  validator.userSignUpValidator,
  signup
);
router.post("/signin", signin);
router.get("/signout", signout);

//any route contain userID app first exec() userById
router.param("userId", userById);

module.exports = router;
