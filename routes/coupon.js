const express = require("express");

const { userById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const validator = require("../validator");
const {
  addCoupon,
  allCoupon,
  getCoupon,
  updateCoupon,
  removeCoupon,
  couponById,
} = require("../controllers/coupon");

const router = express.Router();
router.post(
  "/coupon/add-coupon",
  requireSignin,
  validator.couponAddValidator,
  addCoupon
);
router.get("/coupon/all-coupons", requireSignin, allCoupon);
router.get("/coupon/:couponID", requireSignin, getCoupon);
router.put("/coupon/:couponID", requireSignin, updateCoupon);
router.delete("/coupon/:couponID", requireSignin, removeCoupon);

//any route contain couponID app first exec() userById
router.param("couponID", couponById);

module.exports = router;
