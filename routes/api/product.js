const express = require("express");
const router = express.Router();
const {
  product,
} = require("../../controllers/productControllers/productControllers");

router.post("/createproduct", product);

module.exports = router;
