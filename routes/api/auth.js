const express = require("express");
const registration = require("../../controllers/authControllers/registrationControllers");
const loginControllers = require("../../controllers/authControllers/loginControllers");
const otpMatch = require("../../controllers/authControllers/otpMatchControllers");
const { forgotPassword, resetPassword } = require("../../controllers/authControllers/forgotPassword");
const {
  becomeMerchant, allMerchant, approvedMerchant, deleteMerchant
} = require("../../controllers/authControllers/merchant");
const adminControl = require("../../middleware/adminControl");
const adminMerchantControl = require("../../middleware/adminMerchantControl");
const router = express.Router();

router.post("/registration", registration);
router.post("/login", loginControllers);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/otpmatch", otpMatch);
router.post("/merchant", becomeMerchant);
router.get("/allmerchant", adminMerchantControl, allMerchant);
router.post("/approvedmerchant", adminControl, approvedMerchant);
router.post("/deletemerchant", adminControl, deleteMerchant);

module.exports = router;
