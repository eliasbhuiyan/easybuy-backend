const express = require("express");
const router = express.Router();
const {
  createProduct, secureUpload, createVariant
} = require("../../controllers/productControllers/productControllers");

router.post("/createproduct", secureUpload, createProduct);
router.post("/createvariant", secureUpload, createVariant);

module.exports = router;
