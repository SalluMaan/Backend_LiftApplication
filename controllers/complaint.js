const Complaint = require("../models/complaint");
const _ = require("lodash");
const User = require("../models/user");
const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZE } = require("../utils/HTTP_Code");

exports.complaintById = (req, res, next, id) => {
  Complaint.findById(id).exec((err, complaint) => {
    if (err || !complaint) {
      return res.status(NOT_FOUND).json({
        error: "Complaint not Found.",
      });
    }

    req.complaintProfile = complaint;
    next();
  });
};

exports.getComplaint = (req, res) => {
  return res.json(req.complaintProfile);
};

exports.allComplaintList = (req, res) => {
  const complaint = Complaint.find()
    .populate("postedBy", "_id name")
    .then((complaints) => {
      res.json({
        complaints,
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

// exports.verifyAdmin = (req, res, next) => {
//   User.findById(req.auth._id).exec((err, user) => {
//     if (!user.isAdmin && user.userType != "admin") {
//       console.log(user);
//       return res.status(400).json({
//         error: "User is not Authorized to Perform this Action!.",
//       });
//     }
//   });
//   next();
// };

exports.addComplaint = async (req, res) => {
  //   const couponExists = await Coupon.findOne({ code: req.body.code });
  //   if (couponExists) {
  //     return res.status(403).json({
  //       error: "Coupon With this Code is Already Exist!",
  //     });
  //   }
  const complaint = await new Complaint({
    issueTitle: req.body.issueTitle,
    issueDescription: req.body.issueDescription,
    status: req.body.status,
    isActive: req.body.isActive,
    postedBy: req.auth._id,
  });
  await complaint.save();
  res.status(200).json({
    message: "Complaints has been added Successfully!",
  });
};

exports.updateComplaint = (req, res, next) => {
  let complaint = req.complaintProfile;
  complaint = _.extend(complaint, req.body);
  complaint.updated = Date.now();
  complaint.save((err) => {
    if (err) {
      return res.status(FORBIDDEN).json({
        error: "User is not Authorized to perform this Action.",
      });
    }
    res.json({ message: "Complaint has been updated successfully", complaint });
  });
};

exports.removeComplaint = (req, res) => {
  let complaint = req.complaintProfile;
  complaint.remove((err, complaint) => {
    if (err) {
      return res.status(BAD_REQUEST).json({
        error: err,
      });
    }
    res.json({ message: "Complaint has been deleted Successfully!" });
  });
};
