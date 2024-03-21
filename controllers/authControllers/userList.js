const User = require("../../modal/userScema");
const jwt = require("jsonwebtoken");
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
        const existingUser = await User.findOne({ _id: uid });

        if(!existingUser){
            return res.status(400).send({error: "Something went wrong!"})
        }
        const userObject = {
            auth: existingUser._id,
            name: existingUser.fullName,
            role: existingUser.role,
            email: existingUser.email,
            phone: existingUser.phone,
            address: existingUser.addressOne,
            addressTwo: existingUser.addressTwo,
            avatar: existingUser.avatar,
            city: existingUser.city,
            country: existingUser.country,
            state: existingUser.state,
            zipCode: existingUser.zipCode
          }
        const expiresIn = 10 * 24 * 60 * 60;
        let token = jwt.sign(
            userObject,
            process.env.JWT_SEC,
            { expiresIn }
          );
          await User.findOneAndUpdate({ _id: uid }, {
            $set: {
                "fullName": fullName,
                "phone": phone,
                "email": email,
                "addressOne": addressOne,
                "addressTwo": addressTwo,
                "zipCode": zipCode,
                "city": city,
                "country": country,
                "state": state,
                "sec_token": token,
                "update": Date.now()
            }
        }, { new: true })
        return res.status(200).json({
         message: 'User Updated Successfully!',
        })

    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
};


module.exports = { userList, FindUser, UpdateUser }