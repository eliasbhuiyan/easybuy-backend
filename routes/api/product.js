const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const {
  createProduct,
  secureUpload,
  createVariant,
  getallproduct,
  deleteProduct
} = require("../../controllers/productControllers/productControllers");
// secureUpload will be added in create product route as a middleware
router.post("/createproduct",secureUpload, upload.single("image"), createProduct);
router.post(
  "/createvariant",
  secureUpload,
  // upload.single("image"),
  createVariant
);

router.get("/getallproduct", getallproduct);

router.post("/deleteproduct", deleteProduct);

module.exports = router;
