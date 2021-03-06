const Setting = require("../models/setting");
const _ = require("lodash");
const User = require("../models/user");
const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZE } = require("../utils/HTTP_Code");

exports.settingById = (req, res, next, id) => {
  Setting.findById(id).exec((err, setting) => {
    if (err || !setting) {
      return res.status(NOT_FOUND).json({
        error: "Setting not Found.",
      });
    }

    req.settingProfile = setting;
    next();
  });
};

exports.getSetting = (req, res) => {
  return res.json(req.settingProfile);
};

exports.allSettingsList = (req, res) => {
  const setting = Setting.find()
    .populate("postedBy", "_id name")
    .then((settings) => {
      res.json({
        settings,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(BAD_REQUEST).json({
          error: err,
        });
      }
    });
};

exports.verifyAdmin = (req, res, next) => {
  User.findById(req.auth._id).exec((err, user) => {
    if (!user.isAdmin && user.userType != "admin") {
      console.log(user);
      return res.status(UNAUTHORIZE).json({
        error: "User is not Authorized to Perform this Action!.",
      });
    }
  });
  next();
};

exports.addSetting = async (req, res) => {
  const setting = await new Setting({
    nameOfApp: req.body.nameOfApp,
    colorList: req.body.colorList,
    adminShare: req.body.adminShare,
    firebaseID: req.body.firebaseID,
    logo: req.body.logo,
    country: req.body.country,
    city: req.body.city,
    baseUrl: req.body.baseUrl,
    chatLink: req.body.chatLink,
    postedBy: req.auth._id,
  });
  await setting.save();
  res.status(200).json({
    message: "Setting has been added Successfully!",
  });
};

exports.updateSetting = (req, res, next) => {
  let setting = req.settingProfile;
  setting = _.extend(setting, req.body);
  setting.updated = Date.now();
  setting.save((err) => {
    if (err) {
      return res.status(FORBIDDEN).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    res.json({ message: "Settig has been updated successfully", setting });
  });
};

exports.removeSetting = (req, res) => {
  let setting = req.settingProfile;
  setting.remove((err, setting) => {
    if (err) {
      return res.status(BAD_REQUEST).json({
        error: err,
      });
    }
    res.json({ message: "Setting has been deleted Successfully!" });
  });
};
