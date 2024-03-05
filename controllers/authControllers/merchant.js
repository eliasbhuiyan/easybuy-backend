const Merchant = require("../../modal/merchantSchema");
const User = require("../../modal/userScema");
const bcrypt = require("bcrypt");
// =============== ==================== ================
// =============== Become Merchant Start ================
// =============== ==================== ================
const becomeMerchant = async (req, res) => {
  const { email, password } =
    req.body;

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
              if(existingUser[0].role === "merchant" || existingUser[0].role === "admin"){
                return res.status(400).send({ error: "You are already Authorized! please login" });
              }else{
                // Existing Merchant Check
                const existingMerchant = await Merchant.find({ email: email });
                if (existingMerchant.length > 0) {
                  return res.status(200).send({ message: "Request sent successfully! Wait for approval" });
                } else {
                  // Create Merchant
                  const merchant = new Merchant({
                    merchant: existingUser[0]._id,
                    email: email
                  });
                  merchant.save();                  
                  res.status(200).send({ message: "Request sent successfully! Wait for approval" });
                }
              }
            } else {
              return res.status(400).send({ error: "Authorization Failed!" });
            }
          }
        );
      }
    }else{
      return res.status(400).send({ error: "Don't have an account. Register now." });
    }
  }
  // const merchant = new Merchant({
  //   email,
  //   password,
  // });
  // merchant.save();
  // await User.findOneAndUpdate(
  //   { email: officialEmail },
  //   { $set: { role: "merchant", marchant: true } }
  // );
  // return res.status(200).send({ message: "Request sent successfully! Wait for approval" });
};

// =============== ==================== ================
// =============== Get all Merchant Start ================
// =============== ==================== ================
module.exports = { becomeMerchant };