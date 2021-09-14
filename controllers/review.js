const Review = require("../models/review");
const _ = require("lodash");
const User = require("../models/user");
const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZE } = require("../utils/HTTP_Code");

exports.reviewById = (req, res, next, id) => {
  Review.findById(id).exec((err, review) => {
    if (err || !review) {
      return res.status(NOT_FOUND).json({
        error: "Review not Found.",
      });
    }

    req.reviewProfile = review;
    next();
  });
};

exports.reviewsByRideId = (req, res, next) => {
  console.log(req.body.id);
  Review.find({ rideID: req.body.id })
    .then((reviews) => {
      if (reviews.length === 0) {
        return res.status(NOT_FOUND).json({
          error: "There is no Reviews for this Ride.",
        });
      }
      res.json({
        reviews,
      });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        return res.status(BAD_REQUEST).json({
          error: err,
        });
      }
    });
};

exports.getReview = (req, res) => {
  return res.json(req.reviewProfile);
};

exports.allReviewsList = (req, res) => {
  Review.find()
    .populate("postedBy", "_id name")
    .populate("rideID")
    .then((reviews) => {
      res.json({
        reviews,
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

exports.addReviews = async (req, res) => {
  //   const couponExists = await Coupon.findOne({ code: req.body.code });
  //   if (couponExists) {
  //     return res.status(403).json({
  //       error: "Coupon With this Code is Already Exist!",
  //     });
  //   }
  const review = await new Review({
    rating: req.body.rating,
    comment: req.body.comment,
    postedBy: req.auth._id,
    rideID: req.body.rideID,
  });
  await review.save();
  res.status(200).json({
    message: "Review has been added Successfully!",
  });
};

exports.updateReview = (req, res, next) => {
  let review = req.reviewProfile;
  review = _.extend(review, req.body);
  review.updated = Date.now();
  review.save((err) => {
    if (err) {
      return res.status(FORBIDDEN).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    res.json({ message: "Review has been updated successfully", review });
  });
};

exports.removeReview = (req, res) => {
  let review = req.reviewProfile;
  review.remove((err, review) => {
    if (err) {
      return res.status(BAD_REQUEST).json({
        error: err,
      });
    }
    res.json({ message: "Review has been deleted Successfully!" });
  });
};
