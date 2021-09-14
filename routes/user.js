const express = require("express");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  removeUser,
  activateEmail,
  addLicense,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();

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

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put(
  "/user/:userId",
  requireSignin,
  upload.single("profileImage"),
  updateUser
);
router.put(
  "/user/license/:userId",
  requireSignin,
  upload.single("drivingLicense"),
  addLicense
);
router.delete("/user/:userId", requireSignin, removeUser);
router.get("/user/activate-email/:userId", activateEmail);

router.param("userId", userById);

module.exports = router;
