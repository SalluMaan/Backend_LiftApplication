const Payment = require("../models/payment");
const _ = require("lodash");
const { NOT_FOUND, BAD_REQUEST } = require("../utils/HTTP_Code");

exports.paymentById = (req, res, next, id) => {
  Payment.findById(id).exec((err, payment) => {
    if (err || !payment) {
      return res.status(NOT_FOUND).json({
        error: "Payment not Found.",
      });
    }

    req.paymentProfile = coupon;
    next();
  });
};

exports.getPayment = (req, res) => {
  return res.json(req.paymentProfile);
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

exports.allPayments = (req, res) => {
  const payment = Payment.find()
    .then((payments) => {
      res.json({
        payments,
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

exports.allPaymentsOfUsers = (req, res) => {
  Payment.find({ postedBy: req.auth._id })
    .then((payments) => {
      if (payments.length === 0) {
        return res.status(NOT_FOUND).json({
          error: "Payments not Found.",
        });
      }
      res.json({
        payments,
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

exports.requestPayment = async (req, res) => {
  const payment = await new Payment({
    amount: req.body.amount,
    type: "withdraw",
    postedBy: req.auth._id,
  });
  await payment.save();
  res.status(200).json({
    message: "Payment has been requested Successfully!",
  });
};

// exports.updateCoupon = (req, res, next) => {
//   let coupon = req.couponProfile;
//   coupon = _.extend(coupon, req.body);
//   coupon.updated = Date.now();
//   coupon.save((err) => {
//     if (err) {
//       return res.status(400).json({
//         error: "User is not Authorized to perform this Action.",
//       });
//     }
//     res.json({ coupon });
//   });
// };

// exports.removeCoupon = (req, res) => {
//   let coupon = req.couponProfile;
//   coupon.remove((err, coupon) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     res.json({ message: "Coupon has been deleted Successfully!" });
//   });
// };
