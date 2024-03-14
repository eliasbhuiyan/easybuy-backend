const User = require("../../modal/userScema");
const emailValidation = require("../../utilities/emailValidation");
const { emailVerification } = require("../../utilities/sendEmail");
const verifyTemplete = require("../../utilities/verifyTemplete");
const passwordValidation = require("../../utilities/passwordValidation");
const bcrypt = require("bcrypt");
const token = require("../../utilities/token");
const registration = async (req, res) => {
  const {
    fullName,
    phone,
    email,
    password,
    addressOne,
    addressTwo,
    zipCode,
    city,
    division,
    district,
  } = req.body;
  if (!fullName) {
    return res.status(400).send({ error: "Name is required!" });
  } else if (!addressOne) {
    return res.status(400).send({ error: "Address is required!" });
  } else if (!email) {
    return res.status(400).send({ error: "Email is required!" });
  } else if (!emailValidation(email)) {
    return res.status(400).send({ error: "Email is invalid!" });
  } else if (!password) {
    return res.status(400).send({ error: "Password is required!" });
  }
  // else if(!passwordValidation(password)){
  //     return res.send({error: 'Input a strong password'})
  //   }
  else {
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).send({
        error: "Email already in used, please try with another email",
      });
    }
  }

  bcrypt.hash(password, 10, function (err, hash) {
    const user = new User({
      fullName,
      phone,
      email,
      password: hash,
      addressOne,
      addressTwo,
      zipCode,
      city,
      country,
      state,
      otp: token(),
    });
    user.save();
    emailVerification(user.email, user.otp, verifyTemplete);
    res.status(200).send({
      success: "Registration Successful!, Check your email for verification",
      userId: user._id,
    });
    setTimeout(async () => {
      await User.findOneAndUpdate(
        { email },
        { $set: { otp: null } },
        { new: true }
      );
    }, 180000);
  });
};
module.exports = registration;
