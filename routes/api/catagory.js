const express = require("express");
const {
  catagory,
  subCatagory,
  renderCatagory,
  renderSubCatagory,
} = require("../../controllers/catagoryControllers/catagoryControllers");
const router = express.Router();

router.post("/createcatagory", catagory);
router.post("/createsubcatagory", subCatagory);
router.get("/getallcatagory", renderCatagory);
router.get("/getallsubcatagory", renderSubCatagory);

module.exports = router;
