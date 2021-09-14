const express = require("express");

const { requireSignin } = require("../controllers/auth");
const {
  addFaq,
  allFaqsList,
  getFaq,
  updateFaq,
  removeFaq,
  faqById,
} = require("../controllers/faq");
const validator = require("../validator");

const router = express.Router();
router.post("/faq/add-faq", requireSignin, addFaq);
router.get("/faq/all-faqs", requireSignin, allFaqsList);
router.get("/faq/:faqID", requireSignin, getFaq);
router.put("/faq/:faqID", requireSignin, updateFaq);
router.delete("/faq/:faqID", requireSignin, removeFaq);

//any route contain faqID app first exec() userById
router.param("faqID", faqById);

module.exports = router;
