const express = require("express");

const { userById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const validator = require("../validator");
const {
  verifyAdmin,
  addSetting,
  allSettingsList,
  getSetting,
  settingById,
  removeSetting,
  updateSetting,
} = require("../controllers/setting");

const router = express.Router();
router.post("/setting/add-setting", requireSignin, verifyAdmin, addSetting);
router.get(
  "/setting/all-settings",
  requireSignin,
  verifyAdmin,
  allSettingsList
);
router.get("/setting/:settingID", requireSignin, verifyAdmin, getSetting);
router.put("/setting/:settingID", requireSignin, verifyAdmin, updateSetting);
router.delete("/setting/:settingID", requireSignin, verifyAdmin, removeSetting);

// //any route contain couponID app first exec() userById
router.param("settingID", settingById);

module.exports = router;
