const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const sendEmail = require("../utils/emails");
const crypto = require("crypto");
const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();

const { FORBIDDEN, UNAUTHORIZE, NOT_FOUND } = require("../utils/HTTP_Code");

require("dotenv").config();
exports.signup = async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(FORBIDDEN).json({
      error: "User With this Email ID is Already Exist!",
    });
  }
  console.log(req.file);

  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    // profileImage: req.file.filename,
    userType: req.body.userType,
  });
  await user.save();
  res.status(200).json({
    message: "Signup Successfully!Login Please",
  });
  await sendEmail("signup", {
    id: user._id,
    email: user.email,
    app_url: process.env.APPBASE_URL,
  });

  // //return  resp with user and token to frontend client
};

exports.signupSocialLogin = async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  console.log("User Exist=>", userExists);
  if (userExists) {
    const token = jwt.sign({ _id: userExists._id }, process.env.JWT_SECRET);
    //persist token as 't' in cookie with expiry date

    res.cookie("t", token, { expire: new Date() + 9999 });

    //return  resp with user and token to frontend client
    return res.json({
      token,
      user: userExists,
      message: "Login Successfully!",
    });
  }

  const pass = "#" + req.body.name + crypto.randomBytes(2).toString("hex");
  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: pass,
    profileImage: req.body.profileImage,
    userType: req.body.userType,
    type: req.body.type,
    isEmailVerified: true,
  });
  await user.save();
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  //persist token as 't' in cookie with expiry date

  res.cookie("t", token, { expire: new Date() + 9999 });

  await sendEmail("signup", {
    id: user._id,
    email: user.email,
    app_url: process.env.APPBASE_URL,
  });

  // return  resp with user and token to frontend client
  return res.json({
    token,
    user: user,
    message: "Signup Successfully!",
  });

  // //return  resp with user and token to frontend client
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  console.log("Request =>", email, password);

  //find user
  User.findOne({ email: req.body.email }, (err, user) => {
    //Error or no user
    if (err || !user) {
      return res.status(FORBIDDEN).json({
        error: "User with this Email Doesn't exist.Please Sign in Again...",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(UNAUTHORIZE).json({
        error: "Your Account havn't Verified.Kindly Check your Inbox!Thanks",
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

    const { _id, name, email, wallet, phoneNumber, dateOfBirth, userType } =
      user;
    return res.json({
      token,
      user: user,
      // {
      //   _id,
      //   name,
      //   email,
      //   wallet,
      //   phoneNumber,
      //   dateOfBirth,
      //   userType,
      // },
    });
  });
};

exports.signinSocailLogin = (req, res) => {
  const { email, type } = req.body;
  console.log("Request =>", email, password);

  //find user
  User.findOne({ email: req.body.email }, (err, user) => {
    //Error or no user
    if (err || !user) {
      return res.status(FORBIDDEN).json({
        error: "User with this Email Doesn't exist.Please Sign in Again...",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(UNAUTHORIZE).json({
        error: "Your Account havn't Verified.Kindly Check your Inbox!Thanks",
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

    const { _id, name, email, wallet, phoneNumber, dateOfBirth, userType } =
      user;
    return res.json({
      token,
      user: user,
      // {
      //   _id,
      //   name,
      //   email,
      //   wallet,
      //   phoneNumber,
      //   dateOfBirth,
      //   userType,
      // },
    });
  });
};

exports.requestForgotPassword = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists) {
    return res.status(FORBIDDEN).json({
      error: "User With this Email ID is Does't Exist!",
    });
  }
  const requestToken = crypto.randomBytes(2).toString("hex");
  // const requestToken = Math.floor(1000 + Math.random() * 9000);

  await sendEmail("requestForgotPassword", {
    token: requestToken,
    email: req.body.email,
  });
  let user = _.extend(userExists, { resetToken: requestToken });
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      console.log(err);
      return res.status(FORBIDDEN).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    res.send({
      message: "Email Verification Code Has Been sent to Your Email ID!",
      id: userExists._id,
    });
  });
};

exports.resetPassword = (req, res) => {
  User.findById(req.body.id).exec((err, user) => {
    if (err || !user) {
      return res.status(NOT_FOUND).json({
        error: "User not Found.",
      });
    }

    if (user.resetToken != req.body.resetToken) {
      console.log(user.resetToken, req.body.resetToken);
      return res.status(UNAUTHORIZE).json({
        error: "Token is Expired.Kindly Request Again for Forgot Password.",
      });
    }

    user = _.extend(user, { resetToken: null, password: req.body.password });
    user.updated = Date.now();
    user.save((err) => {
      if (err) {
        console.log(err);
        return res.status(FORBIDDEN).json({
          error: "User is not Authorized to perform this Action.",
        });
      }
      res.send({ message: "Your Password has been Changed Successfully!" });
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
