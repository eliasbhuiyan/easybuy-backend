const Order = require("../../modal/orderSchema");
const User = require("../../modal/userScema");
const CreateOrder = async (req, res) => {
    const { userId, product, variant, quantity, totalAmount } = req.body
    if (!userId || !product || !variant || !quantity || !totalAmount) {
        return res.status(400).send({ error: "What the hell!" });
    }
    try {
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(400).send({ error: "Something is wrong!" });
        }
        const item = {
            product,
            variant,
            quantity,
        }
        const order = new Order({
            user: user._id,
            items: item,
            totalAmount
        })
        order.save()
        // await User.findOneAndUpdate({ _id: user._id }, { $pull: { cartList: { product: product } } })
        await User.findOneAndUpdate({ _id: user._id }, { $set: { order: order._id } })
        return res.status(200).send(order)
    } catch (err) {
        return res.status(400).send({ error: "Something is wrong! Try again." });
    }
}
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const checkout = async (req, res) => {
    const { product, name } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: name
                    },
                    // customer: product.user,
                    unit_amount: product.totalAmount * 100,
                },
                quantity: product.items[0].quantity,
            },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND}success`,
        cancel_url: `${process.env.FRONTEND}cancel`,
    });
    return res.status(200).send({ id: session.id })
}

module.exports = { CreateOrder, checkout }