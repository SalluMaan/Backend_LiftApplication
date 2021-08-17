const express = require("express");
const { requireSignin } = require("../controllers/auth");
const {
  addRide,
  allRides,
  rideById,
  getRide,
  removeRide,
} = require("../controllers/ride");

const validator = require("../validator");
const { rideAddValidator } = require("../validator/RideValidator");

const router = express.Router();
router.post("/ride/add-ride", requireSignin, rideAddValidator, addRide);
router.get("/rides", requireSignin, allRides);
router.get("/ride/:rideID", requireSignin, getRide);
router.delete("/ride/:rideID", requireSignin, removeRide);

router.param("rideID", rideById);

module.exports = router;
