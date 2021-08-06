const Ride = require("../models/ride");
const _ = require("lodash");

exports.allRides = (req, res) => {
  const rides = Ride.find()
    .populate("postedBy", "_id name")
    .then((rides) => {
      res.json({
        rides,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
    });
};

exports.addRide = async (req, res) => {
  const ride = await new Ride({
    pickup: req.body.pickup,
    dropoff: req.body.dropoff,
    addStop: req.body.addStop,
    departureDate: req.body.departureDate,
    departureTime: req.body.departureTime,
    farePerTicket: req.body.farePerTicket,
    seatCapacity: req.body.seatCapacity,
    isMiddleSeatAvailable: req.body.isMiddleSeatAvailable,
    description: req.body.description,
    postedBy: req.auth._id,
  });
  await ride.save();
  res.status(200).json({
    message: "Ride has been added Successfully!",
  });
};

exports.rideById = (req, res, next, id) => {
  Ride.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, ride) => {
      if (err || !ride) {
        return res.status(400).json({
          error: "Ride not Found.",
        });
      }

      req.rideData = ride;
      next();
    });
};

exports.getRide = (req, res) => {
  return res.json(req.rideData);
};

exports.removeRide = (req, res) => {
  let ride = req.rideData;
  ride.remove((err, ride) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ message: "Ride has been deleted Successfully!" });
  });
};
