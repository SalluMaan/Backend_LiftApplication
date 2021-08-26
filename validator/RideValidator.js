const { BAD_REQUEST } = require("../utils/HTTP_Code");

exports.rideAddValidator = (req, res, next) => {
  req.check("pickup", "Pickup Location is Require").notEmpty();
  req.check("dropoff", "DropOff Location is Require").notEmpty();
  req.check("pickupPoints", "Kindly Add Pickup Points.").notEmpty();
  req.check("departureDate", "Departure Date is Require").notEmpty();
  req.check("departureTime", "Departure Time is Require").notEmpty();
  req.check("seatCapacity", "Kindly Specify Number of Seats.").notEmpty();

  //check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    // console.log("ERROR 1st:".firstError)
    return res.status(BAD_REQUEST).json({ error: firstError });
  }

  //proceed to next middleware
  next();
};
