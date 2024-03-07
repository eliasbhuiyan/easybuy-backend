const User = require("../../modal/userScema");
const bcrypt = require("bcrypt");
const loginControllers = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  } else if (!password) {
    return res.status(400).send({ error: "Password is required" });
  } else {
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      // emailVerified check
      if (!existingUser[0].emailVerified) {
        return res.status(400).send({ error: "Email is not verified" });
      } else {
        bcrypt.compare(
          password,
          existingUser[0].password,
          function (err, result) {
            if (result) {
              return res.status(200).send({
                message: "Login Successfull!",
                user: {
                  userName: existingUser[0].fullName,
                  email: existingUser[0].email,
                  role: existingUser[0].role,
                },
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
};

module.exports = loginControllers;
