const Vehicle = require("../models/vehicle");
const _ = require("lodash");

exports.vehicleById = (req, res, next, id) => {
  Vehicle.findById(id).exec((err, vehicle) => {
    if (err || !vehicle) {
      return res.status(400).json({
        error: "Vehicle not Found.",
      });
    }

    req.vehicleprofile = vehicle;
    next();
  });
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

exports.allVehicles = (req, res) => {
  Vehicle.find((err, vehicles) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      vehicles,
    });
  }).select(
    "name numberPlate modalYear brandName Colour vehicleImage seatCapacity isAC updated created"
  );
};

exports.addVehicle = async (req, res) => {
  // const vehiclesExists = await User.findOne({ email: req.body.email });
  // if (vehiclesExists) {
  //   return res.status(403).json({
  //     error: "User With this Email ID is Already Exist!",
  //   });
  // }
  // console.log(req.file);
  const vehicle = await new Vehicle({
    name: req.body.name,
    numberPlate: req.body.numberPlate,
    modalYear: req.body.modalYear,
    brandName: req.body.brandName,
    Colour: req.body.Colour,
    seatCapacity: req.body.seatCapacity,
    isAC: req.body.isAC,
    vehicleImage: req.file.filename,
  });
  await vehicle.save();
  res.status(200).json({
    message: "Vehicle has been added Successfully!",
  });
};

exports.getVehicle = (req, res) => {
  //   req.profile.hashed_password = undefined;
  //   req.profile.salt = undefined;
  return res.json(req.vehicleprofile);
};

exports.updateVehicle = (req, res, next) => {
  let vehicle = req.vehicleprofile;
  vehicle = _.extend(vehicle, req.body);
  vehicle.updated = Date.now();
  vehicle.save((err) => {
    if (err) {
      return res.status(400).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    res.json({ vehicle });
  });
};

exports.removeVehicle = (req, res) => {
  let vehicle = req.vehicleprofile;
  vehicle.remove((err, vehicle) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ message: "Vehicle has been deleted Successfully!" });
  });
};
