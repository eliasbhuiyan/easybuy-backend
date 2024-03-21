const User = require("../../modal/userScema");
// =============== =============== ================
// =============== User Lisr Start ================
// =============== =============== ================

const userList = async (req, res) => {
    const user = await User.find({ role: "user" }, `fullName
    phone
    email
    avatar
    role
    update
    create
    addressOne
    addressTwo
    zipCode
    city
    country
    state
    totalOrder`,);
    res.send({ user });
}
// =============== =============== ================
// =============== User Lisr Start ================
// =============== =============== ================

const FindUser = async (req, res) => {
    const { id } = req.body
    const user = await User.findOne({ _id: id }, `fullName
    phone
    email
    avatar
    role
    update
    create
    addressOne
    addressTwo
    zipCode
    city
    country
    state
    totalOrder`,);
    res.send({ user });
}

module.exports = { userList, FindUser }