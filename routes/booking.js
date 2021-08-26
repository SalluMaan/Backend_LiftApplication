const express = require("express");

const { userById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const validator = require("../validator");

const { couponAddValidator } = require("../validator/CouponValidation");
const {
  requestBooking,
  allBookings,
  bookingById,
  getBooking,
  updateBooking,
  allBookingsOfUser,
} = require("../controllers/booking");

const router = express.Router();
router.post("/booking/request-booking", requireSignin, requestBooking);
router.get("/booking/all-bookings", requireSignin, allBookings);

router.get("/booking/:bookingID", requireSignin, getBooking);
router.put("/booking/:bookingID", requireSignin, updateBooking);
router.get("/get-my-booking", requireSignin, allBookingsOfUser);

// router.delete("/coupon/:couponID", requireSignin, removeCoupon);

// //any route contain bookingID app first exec() userById
router.param("bookingID", bookingById);

module.exports = router;
