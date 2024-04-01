const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const {
  createProduct,
  createVariant,
  getallproduct,
  deleteProduct,
  approvedProduct,
  findOneProduct,
  review
} = require("../../controllers/productControllers/productControllers");
const adminMerchantControl = require("../../middleware/adminMerchantControl");
const adminControl = require("../../middleware/adminControl");
const publicRoute = require("../../middleware/PublicRouteAccess");
const userControl = require("../../middleware/userControl");


router.post("/createproduct", adminMerchantControl, upload.single("image"), createProduct);
router.post(
  "/createvariant",
  adminMerchantControl,
  upload.single("image"),
  createVariant
);
router.post(
  "/approvedproduct",
  adminControl,
  approvedProduct
);

router.get("/getallproduct", publicRoute, getallproduct); // for public
router.post("/findoneproduct", publicRoute, findOneProduct); // for public

router.post("/deleteproduct", adminControl, deleteProduct);
router.post("/review", userControl, review);

module.exports = router;
