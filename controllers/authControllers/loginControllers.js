const User = require("../../modal/userScema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginControllers = async (req, res) => {

  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    } else if (!password) {
      return res.status(400).send({ error: "Password is required" });
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // emailVerified check
        if (!existingUser.emailVerified) {
          return res.status(400).send({ error: "Email is not verified" });
        } else {
          bcrypt.compare(
            password,
            existingUser.password,
            async function (err, result) {
              if (result) {
                try {
                  const userObject = {
                    auth: existingUser._id,
                    name: existingUser.fullName,
                    role: existingUser.role,
                    email: existingUser.email,
                    phone: existingUser.phone,
                    address: existingUser.addressOne,
                    avatar: existingUser.avatar,
                  }
                  //===== JWT ROLE TOKEN =====//
                  let token = jwt.sign(
                    userObject,
                    process.env.JWT_SEC
                  );
                  await User.findByIdAndUpdate(
                    existingUser._id,
                    {
                      $set: { sec_token: token },
                    },
                    { new: true }
                  );
                  // res.cookie("sec_token", token,
                  //   {
                  //     httpOnly: true,
                  //   });
                  return res.status(200).send({
                    message: "Login Successfull!",
                    sec_token: token,
                    userObject
                  });
                } catch (error) {
                  return res.status(400).send({ error: "Internal Server Error!" });
                }
              } else {
                return res.status(400).send({ error: "Authorization Failed!" });
              }
            }
          );
        }
      } else {
        return res.status(400).send({ error: "Authorization Failed!" });
      }
    }
  } catch (err) {
    return res.status(400).send({ error: "Authorization Failed!" });
  }
};

module.exports = loginControllers;
