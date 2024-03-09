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
                //===== JWT ROLE TOKEN =====//
                let token = jwt.sign(
                  {
                    role: existingUser.role,
                    email: existingUser.email
                  },
                  process.env.JWT_SEC
                );
                await User.findByIdAndUpdate(
                  existingUser._id,
                  {
                    $set: { sec_token: token },
                  },
                  { new: true }
                );
                res.cookie("sec_token", token,
                  {
                    httpOnly: false,
                    secure: false,
                  });
                return res.status(200).send({
                  message: "Login Successfull!",
                  role: existingUser.role,
                  sec_token: token,
                });
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
