const User = require("../models/user");
const _ = require("lodash");
const {
  NOT_FOUND,
  FORBIDDEN,
  BAD_REQUEST,
  UNAUTHORIZE,
} = require("../utils/HTTP_Code");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(NOT_FOUND).json({
        error: "User not Found.",
      });
    }

    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(FORBIDDEN).json({
      error: "User is not Authorized to perform this Action.",
    });
  }
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(BAD_REQUEST).json({
        error: err,
      });
    }
    res.json({
      users,
    });
  });
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.activateEmail = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, { isEmailVerified: true });
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(FORBIDDEN).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    res.render("../utils/emails/templates/confirmation.ejs");
  });
};

exports.updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(FORBIDDEN).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ user });
  });
};

exports.addLicense = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, {
    ...req.body,
    drivingLicense: req.file.filename,
    idCardNumber: req.body.idCardNumber,
  });
  console.log("ADD LICENSE", user);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(FORBIDDEN).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({
      message: "Your License Verification Request has been sent to Admin",
      user,
    });
  });
};

exports.removeUser = (req, res) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(BAD_REQUEST).json({
        error: err,
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ message: "User has been deleted Successfully!" });
  });
};

exports.changePassword = (req, res) => {
  User.findById(req.body.id).exec((err, user) => {
    if (err || !user) {
      return res.status(NOT_FOUND).json({
        error: "User not Found.",
      });
    }
    if (!user.authenticate(req.body.oldPassword)) {
      return res.status(FORBIDDEN).json({
        error: "Your Old Password isn't correct..",
      });
    }

    user = _.extend(user, { password: req.body.newPassword });
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
