const express = require("express");
const registration = require("../../controllers/authControllers/registrationControllers");
const loginControllers = require("../../controllers/authControllers/loginControllers");
const otpMatch = require("../../controllers/authControllers/otpMatchControllers");
const forgotPassword = require("../../controllers/authControllers/forgotPassword");
const {
  becomeMerchant, allMerchant, approvedMerchant, deleteMerchant, adminControl
} = require("../../controllers/authControllers/merchant");
const router = express.Router();

router.post("/registration", registration);
router.post("/login", loginControllers);
router.post("/forgotpassword", forgotPassword);
router.post("/otpmatch", otpMatch);
router.post("/merchant", becomeMerchant);
router.get("/allmerchant", allMerchant);
router.post("/approvedmerchant", adminControl, approvedMerchant);
router.post("/deletemerchant", adminControl, deleteMerchant);

module.exports = router;
