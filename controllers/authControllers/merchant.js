const Store = require("../../modal/merchantSchema");
const User = require("../../modal/userScema");

const becomeMerchant = async (req, res) => {
  const { storeName, owner, officialEmail, officialPhone, address, product } =
    req.body;

  if (!storeName || !owner || !officialEmail || !officialPhone || !address) {
    return res.send({ error: "All fields are required" });
  } else {
    const existingStore = await Store.find({ officialEmail });
    if (existingStore.length > 0) {
      return res.send({ message: "Store already exist" });
    }
  }
  const store = new Store({
    storeName,
    owner,
    officialEmail,
    officialPhone,
    address,
    product,
  });
  store.save();
  await User.findOneAndUpdate(
    { _id: owner },
    { $set: { role: "merchant", marchant: true } }
  );
  return res.send({ message: "Store created" });
};

module.exports = { becomeMerchant };
