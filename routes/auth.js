const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const validator = require("../validator");

const router = express.Router();
router.post("/signup", validator.userSignUpValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//any route contain userID app first exec() userById
router.param("userId", userById);

module.exports = router;
