const express = require("express");

const { userById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const validator = require("../validator");
const {
  complaintById,
  addComplaint,
  allComplaintList,
  getComplaint,
  updateComplaint,
  removeComplaint,
} = require("../controllers/complaint");
const { complaintsAddValidator } = require("../validator/ComplaintValidator");

const router = express.Router();
router.post(
  "/complaint/add-complaint",
  requireSignin,
  complaintsAddValidator,
  addComplaint
);
router.get("/complaint/all-complaints", requireSignin, allComplaintList);
router.get("/complaint/:complaintID", requireSignin, getComplaint);
router.put("/complaint/:complaintID", requireSignin, updateComplaint);
router.delete("/complaint/:complaintID", requireSignin, removeComplaint);

// //any route contain couponID app first exec() userById
router.param("complaintID", complaintById);

module.exports = router;
