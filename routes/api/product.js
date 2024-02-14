const express = require("express");
const router = express.Router();
const {
  createProduct, secureUpload,
} = require("../../controllers/productControllers/productControllers");

router.post("/createproduct", secureUpload, createProduct);

module.exports = router;
