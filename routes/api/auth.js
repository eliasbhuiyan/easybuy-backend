const express = require("express");
const registration = require("../../controllers/authControllers/registrationControllers");
const loginControllers = require("../../controllers/authControllers/loginControllers");
const otpMatch = require("../../controllers/authControllers/otpMatchControllers");
const {
  becomeMerchant, allMerchant, approvedMerchant, deleteMerchant
} = require("../../controllers/authControllers/merchant");
const router = express.Router();

router.post("/registration", registration);
router.post("/login", loginControllers);
router.post("/otpmatch", otpMatch);
router.post("/merchant", becomeMerchant);
router.get("/allmerchant", allMerchant);
router.post("/approvedmerchant", approvedMerchant);
router.post("/deletemerchant", deleteMerchant);

module.exports = router;
