const Ride = require("../models/ride");
const _ = require("lodash");
const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZE } = require("../utils/HTTP_Code");

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
        return res.status(BAD_REQUEST).json({
          error: err,
        });
      }
    });
};

exports.allRidesOfUser = (req, res) => {
  Ride.find({ postedBy: req.auth._id })
    .then((rides) => {
      res.json({
        rides,
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

exports.addRide = async (req, res) => {
  const ride = await new Ride({
    pickup: req.body.pickup,
    dropoff: req.body.dropoff,
    pickupPoints: req.body.pickupPoints,
    departureDate: req.body.departureDate,
    departureTime: req.body.departureTime,
    farePerTicket: req.body.farePerTicket,
    seatCapacity: req.body.seatCapacity,
    isMiddleSeatAvailable: req.body.isMiddleSeatAvailable,
    description: req.body.description,
    postedBy: req.auth._id,
    title: req.body.title,
    seatFor: req.body.seatFor,
    isSeatAvailable: req.body.isSeatAvailable,
    seatAvailable: req.body.seatCapacity,
    prefrences: req.body.prefrences,
  });
  await ride.save();
  res.status(200).json({
    message: "Ride has been added Successfully!",
  });
};
// AIzaSyDSwPUB8IuctM5jmr4vx24HG0SjCCCbc1s
exports.rideByNameSearch = (req, res) => {
  const searchfrom = ".*?(?:" + req.body.from + ").*";
  const searchto = ".*?(?:" + req.body.to + ").*";

  Ride.find({
    $and: [
      {
        $or: [
          { "pickup.name": { $regex: searchfrom } },
          { "pickupPoints.name": { $regex: searchfrom } },
        ],
      },
      {
        $or: [
          { "dropoff.name": { $regex: searchto } },
          { "pickupPoints.name": { $regex: searchto } },
        ],
      },
      { seatAvailable: { $gte: req.body.seat } },
      { seatFor: req.body.gender },
    ],
  })
    .then((rides) => {
      if (rides.length === 0) {
        return res.status(NOT_FOUND).json({
          error: "Ride not Found.",
        });
      }
      res.json({
        rides,
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

  // Ride.find({ name: "" });
};

exports.rideById = (req, res, next, id) => {
  Ride.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, ride) => {
      if (err || !ride) {
        return res.status(NOT_FOUND).json({
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
      return res.status(BAD_REQUEST).json({
        error: err,
      });
    }
    res.json({ message: "Ride has been deleted Successfully!" });
  });
};
