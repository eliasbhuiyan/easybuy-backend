const express = require("express");
const {
  catagory,
  subCatagory,
  renderCatagory,
  renderSubCatagory,
  deleteCatagory,
  updateStatus,
  CatagoryById
} = require("../../controllers/catagoryControllers/catagoryControllers");
const adminControl = require("../../middleware/adminControl");
const adminMerchantControl = require("../../middleware/adminMerchantControl");
const router = express.Router();

router.post("/createcatagory", adminMerchantControl, catagory);
router.post("/createsubcatagory", adminMerchantControl, subCatagory);
router.get("/getallcatagory", adminMerchantControl, renderCatagory);
router.post("/getcatagorybyid", adminMerchantControl, CatagoryById);
router.get("/getallsubcatagory", adminMerchantControl, renderSubCatagory);
router.post("/deletecatagory", adminControl, deleteCatagory);
router.post("/updatecatstatus", adminControl, updateStatus);

module.exports = router;