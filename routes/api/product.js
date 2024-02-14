const express = require("express");
const router = express.Router();
const {
  product, secureUpload,
} = require("../../controllers/productControllers/productControllers");

router.post("/createproduct", secureUpload);

module.exports = router;
