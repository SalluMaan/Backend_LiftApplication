const express = require("express");

const { userById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const validator = require("../validator");
const {
  requestPayment,
  allPayments,
  allPaymentsOfUsers,
} = require("../controllers/payment");

const router = express.Router();
router.post("/payment/request-payment", requireSignin, requestPayment);
router.get("/payment/all-payment-request", requireSignin, allPayments);
router.get("/get-my-payment-request", requireSignin, allPaymentsOfUsers);

// router.get("/coupon/:couponID", requireSignin, getCoupon);
// router.put("/coupon/:couponID", requireSignin, updateCoupon);
// router.delete("/coupon/:couponID", requireSignin, removeCoupon);

// //any route contain couponID app first exec() userById
// router.param("couponID", couponById);

module.exports = router;
