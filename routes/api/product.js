const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const {
  createProduct,
  secureUpload,
  createVariant,
  getallproduct,
} = require("../../controllers/productControllers/productControllers");

router.post("/createproduct", secureUpload, createProduct);
router.post(
  "/createvariant",
  secureUpload,
  upload.single("image"),
  createVariant
);

router.get("/getallproduct", getallproduct);
module.exports = router;
