const User = require("../../modal/userScema");
// =============== ==================== ================
// =============== Add tp Cart Product Start ================
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
    for (existProduct of user.cartList) {
      if (existProduct.product == productId) {
        return res.status(201).send({ info: "Product already in cart!" });
      }
    }
    const productdata = {
      product: productId,
      variant: variantId,
      quantity
    }
    const userCart = await User.findOneAndUpdate({ _id: user._id }, { $push: { cartList: productdata } }, { new: true })
    return res.status(200).send({ message: "Product added to cart!", cartList: userCart.cartList })
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

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body
  if (!userId || !productId) {
    return res.status(400).send({ error: "What the hell!" });
  }
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(400).send({ error: "Something is wrong!" });
    }
    await User.findOneAndUpdate({ _id: user._id }, { $pull: { cartList: { product: productId } } })
    return res.send({ message: "Product remove to cart!" })
  } catch (error) {
    return res.status(400).send({ error: "Something is wrong! Try again." });
  }
}

module.exports = { addToCart, showCart, removeFromCart }