const Product = require("../../modal/productSchema");
const Variant = require("../../modal/variantSchema");
const SubCatagory = require("../../modal/subCatagory");
const User = require("../../modal/userScema");
const fs = require('fs');
const { uploadImage, deleteImage } = require("../../utilities/cloudinary");
const path = require('path');
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
    uploadImage(req.file.path, 'easybuy/products', async (error, result) => {
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
        await SubCatagory.findOneAndUpdate(
          { _id: subCatagory },
          { $push: { product: product._id } }
        )
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
  const product = await Product.find().populate("subCatagory").populate("variant");
  res.send({ product });
};
// =============== ====================  ================
// =============== Find One Product Start ================
// =============== ====================  ================
const findOneProduct = async (req, res) => {
  const { id } = req.body
  const product = await Product.findOne({ _id: id }).populate("variant")
    .populate("reviews")
    .populate({
      path: "reviews.userId",
      model: "User",
      select: "fullName email avatar",
    });
  res.send({ product });
};
// =============== ====================  ================
// =============== Delete Product Start ================
// =============== ====================  ================
const deleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    // Delete product
    const existproduct = await Product.findOne({ _id: id });
    if (existproduct) {
      await Product.findOneAndDelete({ _id: existproduct._id });
      if (existproduct.image) {
        deleteImage("easybuy/products/", existproduct.image)
      }
    }
    // Delete variants
    if (existproduct.variant) {
      const variantIds = existproduct.variant;
      const variants = await Variant.deleteMany({ _id: { $in: variantIds } });
      if (variants.image) {
        deleteImage(variants.image)
      }
    }
    res.status(200).send({ message: "Product deleted!" });
  } catch (err) {
    res.status(500).send({ message: "Failed! Please try again." });
  }
}
// =============== ==================== ================
// =============== Create Variant Start ================
// =============== ==================== ================
const createVariant = async (req, res) => {
  const { color, originalPrice, sellingPrice, quantity, size, storage, product } = req.body;
  if (!product) {
    return res.status(400).send({ error: "Select a product!" });
  }
  if (!originalPrice || !sellingPrice) {
    return res.status(400).send({ error: "Price is required!" });
  }
  try {
    uploadImage(req.file.path, 'easybuy/products', async (error, result) => {
      if (result) {
        const variant = new Variant({
          color,
          image: result.url,
          originalPrice,
          sellingPrice,
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
// =============== ==================== ================
// =============== Review Product Start ================
// =============== ==================== ================
const review = async (req, res) => {
  const { email, rating, comment, id } = req.body;
  if (!email) {
    return res.status(400).send({ error: "Email is required!" });
  }
  if (!rating) {
    return res.status(400).send({ error: "Give your rating!" });
  }
  if (!id) {
    return res.status(400).send({ error: "Somthing is wrong!" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "User not found!" });

    }
    const product = await Product.findOne({ _id: id });
    const review = {
      userId: user._id,
      rating,
      comment,
    };
    product.reviews.push(review);
    product.save();
    res.send({ message: "Review created!" });
  } catch (error) {
    return res.status(400).send({ error: "Something is wrong! Try again." });
  }
};
// =============== ==================== ================
// =============== Review Product Start ================
// =============== ==================== ================

const addToCart = async (req, res) => {
  const { productId, userId, variantId, quantity } = req.body
  if (!productId || !userId || !variantId || !quantity) {
    return res.status(400).send({ error: "What the hell!" });
  }
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(400).send({ error: "Something is wrong!" });
    }

    const productdata = {
      product: productId,
      variant: variantId,
      quantity
    }
    await User.findOneAndUpdate({ _id: user._id }, { $push: { cartList: productdata } })
    return res.send({ message: "Product added to cart!" })
  } catch (error) {
    return res.status(400).send({ error: "Something is wrong! Try again." });
  }
}

const showCart = async (req, res) => {
  const userId = req.headers.authorization.split("@")[1];
  if (!userId) {
    return res.status(400).send({ error: "What the hell!" });
  }
  try {
    const user = await User.findOne({ _id: userId }).populate("cartList.product").populate("cartList.variant")
    if (!user) {
      return res.status(400).send({ error: "Something is wrong!" });
    }
    if (user.cartList.length == 0) {
      return res.status(201).send({ message: "Your cart is empty!" })
    }
    return res.status(200).send(user.cartList)
  } catch (error) {
    return res.status(400).send({ error: "Something is wrong! Try again." });
  }
}

module.exports = { createProduct, createVariant, getallproduct, deleteProduct, approvedProduct, findOneProduct, review, addToCart, showCart };
