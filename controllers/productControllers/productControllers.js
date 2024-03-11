const Product = require("../../modal/productSchema");
const Variant = require("../../modal/variantSchema");

// =============== ==================== ================
// =============== Create Product Start ================
// =============== ==================== ================
const createProduct = async (req, res) => {
  const { name, description, img, imageAlt, slug, subCatagory } = req.body;

  if (!name) {
    return res.status(400).send({ error: "Name is required!" });
  } else if (!description) {
    return res.status(400).send({ error: "Description is required!" });
  } else if (!img) {
    return res.status(400).send({ error: "Image is required!" });
  } else if (!imageAlt) {
    return res.status(400).send({ error: "Image Alt is required!" });
  } else if (!slug) {
    return res.status(400).send({ error: "Slug is required!" });
  } else if (!subCatagory) {
    return res.status(400).send({ error: "SubCatagory is required!" });
  }
  const product = new Product({
    name,
    description,
    img: `${process.env.BASE_URL}/uploads/${img}`,
    imageAlt,
    slug,
    subCatagory
  });
  product.save();
  res.status(200).send({ message: "Product created!" });
};
// =============== ====================  ================
// =============== Approved Product Start ================
// =============== ====================  ================
const approvedProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const productStatus = await Product.findOne({ _id: id });
    if (!productStatus) {
      return res.status(400).send({ error: "Product not found!" });
    }
    else if (productStatus.status === "approved") {
      await Product.findByIdAndUpdate(productStatus._id, { status: "pending" });
      return res.status(201).send({ message: "Product pending!" });
    }
    else if (productStatus.status === "pending") {
      await Product.findByIdAndUpdate(id, { status: "approved" });
      return res.status(200).send({ message: "Product Approved Successfully!" });
    }
  } catch (err) {
    res.status(500).send({ error: "Failed! Please try again." });
  }
}

// =============== ====================  ================
// =============== Get All Product Start ================
// =============== ====================  ================
const getallproduct = async (req, res) => {
  const product = await Product.find().populate("subCatagory");
  res.send({ product });
};
// =============== ====================  ================
// =============== Delete Product Start ================
// =============== ====================  ================
const deleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    await Product.findOneAndDelete({ _id: id });
    res.status(200).send({ message: "Product deleted!" });
  } catch (err) {
    res.status(500).send({ message: "Failed! Please try again." });
  }
}
// =============== ==================== ================
// =============== Create Variant Start ================
// =============== ==================== ================
const createVariant = async (req, res) => {
  const { color, price, quantity, size, storage, product } = req.body;

  if (!product) {
    return res.status(400).send({ error: "Product ID is required!" });
  } else {

    const variant = new Variant({
      color,
      // image: `${process.env.BASE_URL}/uploads/${req.file.name}`,
      price,
      quantity,
      size,
      storage,
      product,
    });
    variant.save();
    await Product.findOneAndUpdate(
      { _id: variant.product },
      { $push: { variant: variant._id } }
    );
    res.send({ message: "Variant created!" });
  }

};

module.exports = { createProduct, createVariant, getallproduct, deleteProduct, approvedProduct };
