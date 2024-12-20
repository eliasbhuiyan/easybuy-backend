const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer()
const {
  createProduct,
  createVariant,
  getallproduct,
  deleteProduct,
  approvedProduct,
  findOneProduct,
  review,
} = require("../../controllers/productControllers/productControllers");
const adminMerchantControl = require("../../middleware/adminMerchantControl");
const adminControl = require("../../middleware/adminControl");
const publicRoute = require("../../middleware/PublicRouteAccess");
const userControl = require("../../middleware/userControl");
const { addToCart, showCart } = require("../../controllers/productControllers/cartController");
const { CreateOrder, checkout, orderList } = require("../../controllers/productControllers/OrderController");
const { createInvoice, invoiceList, invoiceDelete } = require("../../controllers/productControllers/invoiceController");


router.post("/createproduct", adminMerchantControl, upload.single("image"), createProduct);
router.post(
  "/createvariant",
  adminMerchantControl,
  upload.single("image"),
  createVariant
);
router.post(
  "/approvedproduct",
  adminControl,
  approvedProduct
);

router.get("/getallproduct", publicRoute, getallproduct);
router.post("/findoneproduct", publicRoute, findOneProduct);

router.post("/deleteproduct", adminControl, deleteProduct);
router.post("/review", userControl, review);
router.post("/addtocart", userControl, addToCart);
router.get("/showcart", userControl, showCart);
router.post("/createorder", userControl, CreateOrder);
router.post("/create-checkout-session", userControl, checkout);
router.get("/orderlist", adminMerchantControl, orderList);
router.post("/createinvoice", adminMerchantControl, createInvoice)
router.get("/invoicelist", adminMerchantControl, invoiceList)
router.post("/invoicedelete", adminControl, invoiceDelete)

module.exports = router;
