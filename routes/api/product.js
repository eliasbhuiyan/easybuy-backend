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

router.get("/getallproduct", getallproduct);
router.post("/findoneproduct", findOneProduct);

router.post("/deleteproduct", adminControl, deleteProduct);
router.post("/review", review);

module.exports = router;
