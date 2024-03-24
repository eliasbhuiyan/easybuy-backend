const User = require("../../modal/userScema");
const jwt = require("jsonwebtoken");
const emailValidation = require("../../utilities/emailValidation");
const ImageUpload = require("../../utilities/cloudinary");
const merchantSchema = require("../../modal/merchantSchema");
const bcrypt = require("bcrypt");
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
    const { fullName, phone, email, addressOne, addressTwo, zipCode, city, country, state, password, uid } = req.body
    if (!fullName) {
        return res.status(400).send({ error: "Name is required!" });
    } else if (!addressOne) {
        return res.status(400).send({ error: "Address is required!" });
    } else if (!email) {
        return res.status(400).send({ error: "Email is required!" });
    } else if (!emailValidation(email)) {
        return res.status(400).send({ error: "Email is invalid!" });
    } else if (!password) {
        return res.status(400).send({ error: "Password is required" });
    }
    try {
        const existingUser = await User.findOne({ _id: uid });
        if (!existingUser) {
            return res.status(400).send({ error: "Something went wrong!" })
        }
        bcrypt.compare(
            password,
            existingUser.password,
            async function (err, result) {
                if (result) {
                    ImageUpload(req.file?.path, async (error, result) => {
                        const updatedUser = await User.findOneAndUpdate({ _id: uid }, {
                            $set: {
                                "avatar": result.url,
                                "fullName": fullName,
                                "phone": phone,
                                "email": email,
                                "addressOne": addressOne,
                                "addressTwo": addressTwo,
                                "zipCode": zipCode,
                                "city": city,
                                "country": country,
                                "state": state,
                                "update": Date.now()
                            }
                        }, { new: true })
                        const userObject = {
                            auth: updatedUser._id,
                            name: updatedUser.fullName,
                            role: updatedUser.role,
                            email: updatedUser.email,
                            phone: updatedUser.phone,
                            address: updatedUser.addressOne,
                            addressTwo: updatedUser.addressTwo,
                            avatar: updatedUser.avatar,
                            city: updatedUser.city,
                            country: updatedUser.country,
                            state: updatedUser.state,
                            zipCode: updatedUser.zipCode
                        }
                        const expiresIn = 10 * 24 * 60 * 60;
                        let token = jwt.sign(
                            userObject,
                            process.env.JWT_SEC,
                            { expiresIn }
                        );
                        return res.status(200).json({
                            message: 'User Updated Successfully!',
                            sec_token: token,
                            userObject
                        })
                    })
                } else {
                    return res.status(400).send({ error: "Authorization Failed!" });
                }
            }
        );

    } catch (err) {
        return res.status(400).send({ error: 'Internal Server Error!' })
    }
};


module.exports = { userList, FindUser, UpdateUser }