const express = require("express");
const registration = require("../../controllers/authControllers/registrationControllers");
const loginControllers = require("../../controllers/authControllers/loginControllers");
const otpMatch = require("../../controllers/authControllers/otpMatchControllers");
const {
  becomeMerchant,
} = require("../../controllers/authControllers/merchant");
const router = express.Router();

router.post("/registration", registration);
router.post("/login", loginControllers);
router.post("/otpmatch", otpMatch);
router.post("/merchant", becomeMerchant);

module.exports = router;
