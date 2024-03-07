const Merchant = require("../../modal/merchantSchema");
const User = require("../../modal/userScema");
const bcrypt = require("bcrypt");
// =============== ==================== ================
// =============== Secured Upload Start ================
// =============== ==================== ================
async function adminControl(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(400).send({ error: "Authorization Failed!" });
  }
  const userId = req.headers.authorization.split("@")[1];
  const password = req.headers.authorization.split("@")[2];

  try {
    let user = await User.find({ _id: userId });
    if (user.length > 0) {
      if (password == process.env.SWTSECRT) {
        if (user[0].role == "admin") {
          return next();
        } else {
          return res.status(400).send({ error: "Authorization Failed!" });
        }
      } else {
        return res.status(400).send({ error: "Authorization Failed!" });
      }
    } else {
      return res.status(400).send({ error: "Authorization Failed!" });
    }
  } catch {
    return res.status(400).send({ error: "Authorization Failed!" });
  }
}
// =============== ==================== ================
// =============== Become Merchant Start ================
// =============== ==================== ================
const becomeMerchant = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "All fields are required!" });
  } else {
    // Existing User Check
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      // emailVerified check
      if (!existingUser[0].emailVerified) {
        return res.status(400).send({ error: "Email is not verified" });
      } else {
        // Password Check
        bcrypt.compare(
          password,
          existingUser[0].password,
          async function (err, result) {
            if (result) {
              // Role Check
              if (
                existingUser[0].role === "merchant" ||
                existingUser[0].role === "admin"
              ) {
                return res
                  .status(400)
                  .send({ error: "You are already Authorized! please login" });
              } else {
                // Existing Merchant Check
                const existingMerchant = await Merchant.find({ email: email });
                if (existingMerchant.length > 0) {
                  return res.status(200).send({
                    message: "Request sent successfully! Wait for approval",
                  });
                } else {
                  // Create Merchant
                  const merchant = new Merchant({
                    merchant: existingUser[0]._id,
                    email: email,
                  });
                  merchant.save();
                  res.status(200).send({
                    message: "Request sent successfully! Wait for approval",
                  });
                }
              }
            } else {
              return res.status(400).send({ error: "Authorization Failed!" });
            }
          }
        );
      }
    } else {
      return res
        .status(400)
        .send({ error: "Don't have an account. Register now." });
    }
  }
};
// =============== ==================== ================
// =============== Get all Merchant Start ================
// =============== ==================== ================
const allMerchant = async (req, res) => {
  const merchant = await Merchant.find().populate("merchant");
  res.send({ merchant });
};
// =============== ==================== ================
// =============== Approved Merchant Start ================
// =============== ==================== ================
const approvedMerchant = async (req, res) => {
  const { id } = req.body;
  try {
    let merchant = await Merchant.findOne({ _id: id });
    if (merchant) {
      const merchantId = merchant.merchant;
      await User.findOneAndUpdate(
        { _id: merchantId },
        { $set: { role: "merchant" } },
        { new: true }
      )
        .then(() => {
          res.status(200).send({ message: "Merchant approved successfully!" });
        })
        .catch((err) => {
          res.status(400).send({ error: "Something went wrong!" });
        });
    } else {
      return res.status(400).send({ error: "Merchant not found!" });
    }
  } catch {
    return res.status(400).send({ error: "Something went wrong!" });
  }
};
// =============== ==================== ================
// =============== Delete Merchant Start ================
// =============== ==================== ================
const deleteMerchant = async (req, res) => {
  const { id } = req.body;
  try {
    const merchant = await Merchant.findOneAndDelete({ _id: id });
    if (merchant) {
      const merchantId = merchant.merchant;
      await User.findOneAndUpdate(
        { _id: merchantId },
        { $set: { role: "user", sec_token: null } },
        { new: true }
      )
        .then(() => {
          res.status(200).send({ message: "Merchant Rejected successfully!" });
        })
        .catch((err) => {
          res.status(400).send({ error: "Something went wrong!" });
        });
    } else {
      return res.status(400).send({ error: "Merchant not found!" });
    }
  } catch {
    return res.status(400).send({ error: "Something went wrong!" });
  }
};

module.exports = {
  becomeMerchant,
  allMerchant,
  approvedMerchant,
  deleteMerchant,
  adminControl,
};
