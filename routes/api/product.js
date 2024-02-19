const express = require("express");
const router = express.Router();
const multer = require('multer')
const {
  createProduct, secureUpload, createVariant
} = require("../../controllers/productControllers/productControllers");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1])
  }
})
const upload = multer({ storage: storage })

router.post("/createproduct", secureUpload, createProduct);
router.post("/createvariant", secureUpload, upload.single('image'), createVariant);

module.exports = router;
