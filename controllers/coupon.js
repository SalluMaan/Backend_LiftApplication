const Coupon = require("../models/coupon");
const _ = require("lodash");
const {
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
  UNAUTHORIZE,
} = require("../utils/HTTP_Code");

exports.couponById = (req, res, next, id) => {
  Coupon.findById(id).exec((err, coupon) => {
    if (err || !coupon) {
      return res.status(NOT_FOUND).json({
        error: "Coupon not Found.",
      });
    }

    req.couponProfile = coupon;
    next();
  });
};

exports.getCoupon = (req, res) => {
  return res.json(req.couponProfile);
};
// exports.hasAuthorization = (req, res, next) => {
//   const authorized =
//     req.profile && req.auth && req.profile._id === req.auth._id;
//   if (!authorized) {
//     return res.status(403).json({
//       error: "User is not Authorized to perform this Action.",
//     });
//   }
// };

exports.allCoupon = (req, res) => {
  const coupon = Coupon.find()
    .then((coupons) => {
      res.json({
        coupons,
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

exports.addCoupon = async (req, res) => {
  const couponExists = await Coupon.findOne({ code: req.body.code });
  if (couponExists) {
    return res.status(FORBIDDEN).json({
      error: "Coupon With this Code is Already Exist!",
    });
  }
  const coupon = await new Coupon({
    title: req.body.title,
    code: req.body.code,
    from: req.body.from,
    to: req.body.to,
  });
  await coupon.save();
  res.status(200).json({
    message: "Coupon has been added Successfully!",
  });
};

exports.updateCoupon = (req, res, next) => {
  let coupon = req.couponProfile;
  coupon = _.extend(coupon, req.body);
  coupon.updated = Date.now();
  coupon.save((err) => {
    if (err) {
      return res.status(FORBIDDEN).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    res.json({ coupon });
  });
};

exports.removeCoupon = (req, res) => {
  let coupon = req.couponProfile;
  coupon.remove((err, coupon) => {
    if (err) {
      return res.status(BAD_REQUEST).json({
        error: err,
      });
    }
    res.json({ message: "Coupon has been deleted Successfully!" });
  });
};
