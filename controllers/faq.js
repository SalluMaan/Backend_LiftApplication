const Faq = require("../models/faq");
const _ = require("lodash");
const User = require("../models/user");
const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZE } = require("../utils/HTTP_Code");

exports.faqById = (req, res, next, id) => {
  Faq.findById(id).exec((err, faq) => {
    if (err || !faq) {
      return res.status(NOT_FOUND).json({
        error: "Faq not Found.",
      });
    }

    req.faqProfile = faq;
    next();
  });
};

exports.getFaq = (req, res) => {
  return res.json(req.faqProfile);
};

exports.allFaqsList = (req, res) => {
  const setting = Faq.find()
    .populate("postedBy", "_id name")
    .then((faqs) => {
      res.json({
        faqs,
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

exports.addFaq = async (req, res) => {
  //   const couponExists = await Coupon.findOne({ code: req.body.code });
  //   if (couponExists) {
  //     return res.status(403).json({
  //       error: "Coupon With this Code is Already Exist!",
  //     });
  //   }
  const faq = await new Faq({
    question: req.body.question,
    answer: req.body.answer,
    isActive: req.body.isActive,
  });
  await faq.save();
  res.status(200).json({
    message: "Faq has been added Successfully!",
  });
};

exports.updateFaq = (req, res, next) => {
  let faq = req.faqProfile;
  faq = _.extend(faq, req.body);
  faq.updated = Date.now();
  faq.save((err) => {
    if (err) {
      return res.status(FORBIDDEN).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    res.json({ message: "Faq has been updated successfully", faq });
  });
};

exports.removeFaq = (req, res) => {
  let faq = req.faqProfile;
  faq.remove((err, faq) => {
    if (err) {
      return res.status(BAD_REQUEST).json({
        error: err,
      });
    }
    res.json({ message: "Faq has been deleted Successfully!" });
  });
};
