const User = require("../../modal/userScema");
const Product = require("../../modal/productSchema");
const Store = require("../../modal/merchantSchema");
const Variant = require("../../modal/variantSchema");
// =============== ==================== ================
// =============== Secured Upload Start ================
// =============== ==================== ================
async function secureUpload(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(400).send({ error: "Authorization Failed!" });
  }
  const userId = req.headers.authorization.split("@")[1];
  const password = req.headers.authorization.split("@")[2];

  try {
    let user = await User.find({ _id: userId });
    if (user.length > 0) {
      if (password == process.env.SWTSECRT) {
        if (user[0].marchant) {
          return next();
        } else {
          return res.status(400).send({ error: "Authorization Failed!" });
        }
      } else {
        return res.status(400).send({ error: "Authorization Failed!" });
      }
    } else {
      return res.status(400).send({ error: "Authorization Failed!" });
    }
  } catch {
    return res.status(400).send({ error: "Authorization Failed!" });
  }
}

// =============== ==================== ================
// =============== Create Product Start ================
// =============== ==================== ================
const createProduct = async (req, res) => {
  const { name, description, img,imageAlt, slug } = req.body;

  if (!name) {
    return res.status(400).send({ error: "Name is required!" });
  } else if (!description) {
    return res.status(400).send({ error: "Description is required!" });
  } else if (!img) {
    return res.status(400).send({ error: "Image is required!" });
  }else if (!imageAlt) {
    return res.status(400).send({ error: "Image Alt is required!" });
  } else if (!slug) {
    return res.status(400).send({ error: "Slug is required!" });
  }
    const product = new Product({
      name,
      description,
      img: `${process.env.BASE_URL}/uploads/${img}`,
      imageAlt,
      slug,
    });
    product.save();
    res.status(200).send({ message: "Product created!" });
};
// =============== ====================  ================
// =============== Get All Product Start ================
// =============== ====================  ================
const getallproduct = async (req, res) => {
  const product = await Product.find();
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

  if(!product){
    return res.status(400).send({ error: "Product ID is required!" });
  }else{

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

module.exports = { createProduct, secureUpload, createVariant, getallproduct, deleteProduct };
