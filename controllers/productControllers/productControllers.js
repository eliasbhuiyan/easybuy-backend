const Product = require("../../modal/productSchema");
const Variant = require("../../modal/variantSchema");
const ImageUpload = require("../../utilities/cloudinary")
// =============== ==================== ================
// =============== Create Product Start ================
// =============== ==================== ================
const createProduct = async (req, res) => {
  const { name, description, imageAlt, slug, subCatagory } = req.body;
  if (!name) {
    return res.status(400).send({ error: "Name is required!" });
  } else if (!description) {
    return res.status(400).send({ error: "Description is required!" });
  } else if (!req.file) {
    return res.status(400).send({ error: "Image is required!" });
  } else if (!imageAlt) {
    return res.status(400).send({ error: "Image Alt is required!" });
  } else if (!slug) {
    return res.status(400).send({ error: "Slug is required!" });
  } else if (!subCatagory) {
    return res.status(400).send({ error: "SubCatagory is required!" });
  }

  try {
    ImageUpload(req.file.path, (error, result) => {
      if (result) {
        const product = new Product({
          name,
          description,
          image: result.url,
          imageAlt,
          slug,
          subCatagory
        });
        product.save();
        return res.status(200).send({ message: "Product created!" });
      } else {
        return res.status(400).send({ error: "Something is wrong! Try again." });
      }
    });
  } catch (error) {
    return res.status(400).send({ error: "Something is wrong! Try again." });
  }
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
// =============== Find One Product Start ================
// =============== ====================  ================
const findOneProduct = async (req, res) => {
  const { id } = req.body
  const product = await Product.findOne({ shortID: id }).populate("variant")
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
  }
  try {
    ImageUpload(req.file.path, async (error, result) => {
      if (result) {
        const variant = new Variant({
          color,
          image: result.url,
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
      } else {
        return res.status(400).send({ error: "Something is wrong! Try again." });
      }
    });
  } catch (error) {
    return res.status(400).send({ error: "Something is wrong! Try again." });
  }
};

module.exports = { createProduct, createVariant, getallproduct, deleteProduct, approvedProduct, findOneProduct };
