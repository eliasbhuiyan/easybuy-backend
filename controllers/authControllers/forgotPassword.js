const jwt = require('jsonwebtoken');
const User = require("../../modal/userScema");
const { emailForgotPassword } = require("../../utilities/sendEmail");
const forgotpassTempete = require('../../utilities/forgotpassTempete');

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {

        let token = jwt.sign({ email: email }, 'eliasbhuiyan');

        await User.findOneAndUpdate(
            { email },
            { $set: { otp: token } },
            { new: true }
        );
        emailForgotPassword(email, token, forgotpassTempete);
        return res.status(200).send({ message: "Email sent successfully! Please check your email" });
    } else {
        return res.status(400).send({ error: "Email not found!" });
    }
}

module.exports = forgotPassword;