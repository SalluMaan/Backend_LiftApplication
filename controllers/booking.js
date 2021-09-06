const Booking = require("../models/booking");
const Ride = require("../models/ride");

const _ = require("lodash");
const {
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
  UNAUTHORIZE,
} = require("../utils/HTTP_Code");

exports.bookingById = (req, res, next, id) => {
  Booking.findById(id)
    .populate("postedBy", "_id name")
    .populate("rideID")
    .exec((err, booking) => {
      if (err || !booking) {
        return res.status(NOT_FOUND).json({
          error: "Booking not Found.",
        });
      }
      //   Ride.find({ "pickupPoints._id": booking.pickupID }).exec(
      //     (err, pickup) => {
      //       if (err) {
      //         console.log("Error", err);
      //         return res.status(NOT_FOUND).json({
      //           error: "Pickup Point not Found.",
      //         });
      //       }
      //       var data = pickup[0];
      //       console.log("Success", data);

      //       req.bookingProfile = { booking, PickupPoint: data };
      //       console.log("req.bookingProfile", req.bookingProfile);
      //       next();
      //     }
      //   );
      req.bookingProfile = booking;
      next();
    });
};

exports.getBooking = (req, res) => {
  return res.json(req.bookingProfile);
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

exports.allBookings = (req, res) => {
  const booking = Booking.find()
    .populate("postedBy", "_id name")
    .populate("rideID")
    .then((bookings) => {
      res.json({
        bookings,
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

exports.allBookingsOfUser = (req, res) => {
  Booking.find({ postedBy: req.auth._id })
    .populate("rideID")
    .then((bookings) => {
      if (bookings.length === 0) {
        return res.status(NOT_FOUND).json({
          error: "Booking not Found.",
        });
      }
      res.status(200).json({
        bookings,
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

exports.requestBooking = async (req, res) => {
  const booking = await new Booking({
    rideID: req.body.rideID,
    pickupID: req.body.pickupID,
    postedBy: req.auth._id,
  });
  await booking.save();
  res.status(200).json({
    message: "Request for Booking has been added Successfully!",
  });
};

exports.updateBooking = (req, res, next) => {
  let booking = req.bookingProfile;
  booking = _.extend(booking, req.body);
  booking.updated = Date.now();
  booking.save((err) => {
    if (err) {
      return res.status(FORBIDDEN).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    res.json({ booking });
  });
};

// exports.removeCoupon = (req, res) => {
//   let coupon = req.couponProfile;
//   coupon.remove((err, coupon) => {
//     if (err) {
//       return res.status(BAD_REQUEST).json({
//         error: err,
//       });
//     }
//     res.json({ message: "Coupon has been deleted Successfully!" });
//   });
// };
