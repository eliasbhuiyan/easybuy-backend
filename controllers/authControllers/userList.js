const User = require("../../modal/userScema");
const emailValidation = require("../../utilities/emailValidation");
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
// =============== Find One Start ================
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
// =============== =============== ================
// =============== Update User Start ================
// =============== =============== ================

const UpdateUser = async (req, res) => {
    const { fullName, phone, email, addressOne, addressTwo, zipCode, city, country, state, uid } = req.body
    try {
        if (!fullName) {
            return res.status(400).send({ error: "Name is required!" });
        } else if (!addressOne) {
            return res.status(400).send({ error: "Address is required!" });
        } else if (!email) {
            return res.status(400).send({ error: "Email is required!" });
        } else if (!emailValidation(email)) {
            return res.status(400).send({ error: "Email is invalid!" });
        }
        console.log(uid);
        await User.findByIdAndUpdate({ uid }, {
            $set: {
                fullName,
                phone,
                email,
                addressOne,
                addressTwo,
                zipCode,
                city,
                country,
                state
            }
        }, { new: true })
        // console.log('User Updated Successfully!');
        return res.status(200).json({ message: 'User Updated Successfully!' })

    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
};


module.exports = { userList, FindUser, UpdateUser }