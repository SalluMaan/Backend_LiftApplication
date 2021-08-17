const express = require("express");
const {
  allVehicles,
  addVehicle,
  vehicleById,
  getVehicle,
  updateVehicle,
  removeVehicle,
} = require("../controllers/vehicle");
const { userById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

var multer = require("multer");
const { vehicleAddValidator } = require("../validator/VehicleValidator");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

var upload = multer({ storage: storage });

const router = express.Router();
router.post(
  "/vehicle/add-vehicle",
  upload.single("vehicleImage"),
  requireSignin,
  vehicleAddValidator,
  addVehicle
);
router.get("/vehicle/all-vehicles", requireSignin, allVehicles);
router.get("/vehicle/:vehicleID", requireSignin, getVehicle);
router.put("/vehicle/:vehicleID", requireSignin, updateVehicle);
router.delete("/vehicle/:vehicleID", requireSignin, removeVehicle);

//any route contain vehicleID app first exec() userById
router.param("vehicleID", vehicleById);

module.exports = router;
