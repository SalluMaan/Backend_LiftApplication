const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const sendEmail = require("../utils/emails");
const { FORBIDDEN, UNAUTHORIZE } = require("../utils/HTTP_Code");

require("dotenv").config();
exports.signup = async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(FORBIDDEN).json({
      error: "User With this Email ID is Already Exist!",
    });
  }
  console.log(req.file);
  await sendEmail(
    "accountVerification",
    { email: req.body.email, password: req.body.password },
    next
  );

  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    OTPCode: req.body.OTPCode,
    profileImage: req.file.filename,
    userType: req.body.userType,
  });
  await user.save();
  res.status(200).json({
    message: "Signup Successfully!Login Please",
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //find user
  User.findOne({ email: req.body.email }, (err, user) => {
    //Error or no user
    if (err || !user) {
      return res.status(FORBIDDEN).json({
        error: "User with this Email Doesn't exist.Please Sign in Again...",
      });
    }
    //user is found pass/email must match
    //create authenticate method in model and use here
    if (!user.authenticate(password)) {
      return res.status(FORBIDDEN).json({
        error: "Email and Password doesn't match..",
      });
    }
    //generate token with userId and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist token as 't' in cookie with expiry date

    res.cookie("t", token, { expire: new Date() + 9999 });

    //return  resp with user and token to frontend client

    const { _id, name, email, wallet, phoneNumber, dateOfBirth } = user;
    return res.json({
      token,
      user: { _id, name, email, wallet, phoneNumber, dateOfBirth },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({
    message: "SignOut Successfully!...",
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
