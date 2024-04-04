const express = require("express");
const { registration, resendOtp } = require("../../controllers/authControllers/registrationControllers");
const loginControllers = require("../../controllers/authControllers/loginControllers");
const otpMatch = require("../../controllers/authControllers/otpMatchControllers");
const { forgotPassword, resetPassword } = require("../../controllers/authControllers/forgotPassword");
const {
  becomeMerchant, allMerchant, approvedMerchant, deleteMerchant
} = require("../../controllers/authControllers/merchant");
const upload = require("../../middleware/multer");
const adminControl = require("../../middleware/adminControl");
const adminMerchantControl = require("../../middleware/adminMerchantControl");
const userControl = require("../../middleware/userControl");
const { userList, FindUser, UpdateUser } = require("../../controllers/authControllers/userList");
const publicRoute = require("../../middleware/PublicRouteAccess");
const router = express.Router();

router.post("/registration", publicRoute, registration);
router.post("/login", publicRoute, loginControllers);
router.get("/userlist", adminMerchantControl, userList);
router.post("/finduser", userControl, FindUser);
router.post("/updateuser", upload.single("image"), userControl, UpdateUser);
router.post("/forgotpassword", publicRoute, forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/resendotp", publicRoute, resendOtp);
router.post("/otpmatch", publicRoute, otpMatch);
router.post("/merchant", publicRoute, becomeMerchant);
router.get("/allmerchant", adminMerchantControl, allMerchant);
router.post("/approvedmerchant", adminControl, approvedMerchant);
router.post("/deletemerchant", adminControl, deleteMerchant);

module.exports = router;
