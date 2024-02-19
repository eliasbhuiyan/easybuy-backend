const User = require("../../modal/userScema")
const Product = require("../../modal/productSchema")
const Store = require("../../modal/merchantSchema");
const Variant = require("../../modal/variantSchema");
// =============== ==================== ================
// =============== Secured Upload Start ================
// =============== ==================== ================
async function secureUpload(req, res, next) {
  if (!req.headers.authorization) {
    return res.send({ error: "Authorization Failed" });
  }
  const userId = req.headers.authorization.split("@")[1];
  const password = req.headers.authorization.split("@")[2];

  try {
    let user = await User.find({ _id: userId });
    if (user.length > 0) {
      if (password == process.env.SWTSECRT) {
        if (user[0].marchant) {
          return next()
        } else {
          return res.send({ error: "You are not able to upload product" });
        }
      } else {
        return res.send({ error: "Authorization Failed" });
      }
    } else {
      return res.send({ error: "Authorization Failed" });
    }

  } catch {
    return res.send({ error: "Authorization Failed" });
  }

}

// =============== ==================== ================
// =============== Create Product Start ================
// =============== ==================== ================
const createProduct = async (req, res) => {
  const { name, description, img, store } = req.body;
  if (!name) {
    return res.send({ error: "Name is required" });
  } else if (!description) {
    return res.send({ error: "Description is required" });
  } else if (!img) {
    return res.send({ error: "Image is required" });
  } else if (!store) {
    return res.send({ error: "Store is required" });
  }
  const product = new Product({
    name,
    description,
    img,
    store,
  });
  product.save();
  await Store.findOneAndUpdate(
    { _id: product.store },
    { $push: { product: product._id } }
  )
  res.send({ message: "Product created" });
};
// =============== ==================== ================
// =============== Create Variant Start ================
// =============== ==================== ================
const createVariant = async (req, res) => {
  const { color, image,size,storage, product } = req.body;
  if (!color || !image || !product) {
    return res.send({ error: "All fields are required" });
  }
  const variant = new Variant({
    color,
    image,
    size,
    storage,
    product,
  })
  variant.save();
  await Product.findOneAndUpdate(
    { _id: variant.product },
    { $push: { variant: variant._id } }
  )
  res.send({ message: "Variant created" });
}

module.exports = { createProduct, secureUpload, createVariant };
