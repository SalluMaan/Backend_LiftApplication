const Setting = require("../models/setting");
const _ = require("lodash");
const User = require("../models/user");

exports.settingById = (req, res, next, id) => {
  Setting.findById(id).exec((err, setting) => {
    if (err || !setting) {
      return res.status(400).json({
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
        return res.status(400).json({
          error: err,
        });
      }
    });
};

exports.verifyAdmin = (req, res, next) => {
  User.findById(req.auth._id).exec((err, user) => {
    if (!user.isAdmin && user.userType != "admin") {
      console.log(user);
      return res.status(400).json({
        error: "User is not Authorized to Perform this Action!.",
      });
    }
  });
  next();
};

exports.addSetting = async (req, res) => {
  //   const couponExists = await Coupon.findOne({ code: req.body.code });
  //   if (couponExists) {
  //     return res.status(403).json({
  //       error: "Coupon With this Code is Already Exist!",
  //     });
  //   }
  const setting = await new Setting({
    nameOfApp: req.body.nameOfApp,
    colorList: req.body.colorList,
    adminShare: req.body.adminShare,
    firebaseID: req.body.firebaseID,
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
      return res.status(400).json({
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
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ message: "Setting has been deleted Successfully!" });
  });
};
