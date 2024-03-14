const User = require("../../modal/userScema");
// =============== =============== ================
// =============== User Lisr Start ================
// =============== =============== ================

const userList = async (req, res) => {
    const user = await User.find({ role: "user" }, 'fullName email avatar create phone addressOne totalOrder',);
    res.send({ user });
}

module.exports = userList