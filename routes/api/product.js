const express = require("express");
const router = express.Router();
const upload = require('../../utilities/multer')
const {
  createProduct, secureUpload, createVariant
} = require("../../controllers/productControllers/productControllers");


router.post("/createproduct", secureUpload, createProduct);
router.post("/createvariant", secureUpload, upload.single('image'), createVariant);

module.exports = router;
