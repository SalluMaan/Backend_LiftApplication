const express = require("express");

const { requireSignin } = require("../controllers/auth");

const {
  addReviews,
  allReviewsList,
  getReview,
  updateReview,
  removeReview,
  reviewById,
  reviewsByRideId,
} = require("../controllers/review");
const validator = require("../validator");
const { reviewAddValidator } = require("../validator/ReviewValidation");

const router = express.Router();
router.post(
  "/review/add-review",
  requireSignin,
  reviewAddValidator,
  addReviews
);
router.get("/review/all-reviews", requireSignin, allReviewsList);
router.post("/review/all-ride-reviews", requireSignin, reviewsByRideId);
router.get("/review/:reviewID", requireSignin, getReview);
router.put("/review/:reviewID", requireSignin, updateReview);
router.delete("/review/:reviewID", requireSignin, removeReview);

//any route contain reviewID app first exec() userById
router.param("reviewID", reviewById);

module.exports = router;
