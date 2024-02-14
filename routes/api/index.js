const express = require("express");
const router = express.Router();
const authentication = require("./auth");
const catagory = require("./catagory");
const product = require("./product");

router.use("/auth", authentication);
router.use("/catagory", catagory);
router.use("/product", product);

module.exports = router;
