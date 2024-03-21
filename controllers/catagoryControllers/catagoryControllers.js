const Catagory = require("../../modal/catagorySchema.js.js");
const SubCatagory = require("../../modal/subCatagory.js");
// ================ ===================== ================
// ================ Create Catagory Start ================
// ================ ===================== ================
const catagory = async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).send({ error: "Name is required!" });
  }
  try {
    const existingCatagory = await Catagory.find({ name });
    if (existingCatagory.length > 0) {
      return res.status(400).send({
        error: "Catagory already in used!, please try with another Catagory",
      });
    }

    const catagory = new Catagory({
      name,
      description
    });
    catagory.save();
    res.status(200).send({ message: "Catagory created successfully!" });
  } catch (error) {
    return res.status(400).send({ error: "Something went wrong! Try again." });
  }
};

// ================ ========================= ================
// ================ Create Sub Catagory Start ================
// ================ ========================= ================
const subCatagory = async (req, res) => {
  const { name, catagory, description } = req.body;
  if (!name || !catagory) {
    return res.status(400).send({ error: "All fields are required" });
  }
  try {
    const existingSubCatagory = await SubCatagory.find({ name });
    if (existingSubCatagory.length > 0) {
      return res.status(400).send({ error: "Sub Catagory already in used !" });
    }
    const subCatagory = new SubCatagory({
      name,
      catagory,
      description
    });
    subCatagory.save();
    await Catagory.findOneAndUpdate(
      { _id: subCatagory.catagory },
      { $push: { subCatagory: subCatagory._id } }
    );
    res.status(200).send({ message: "Sub Catagory created successfully!" });
  } catch (error) {
    return res.status(400).send({ error: "Something went wrong! Try again." });
  }
};

// ================ ===================== ================
// ================ Render Catagory Start ================
// ================ ===================== ================

const renderCatagory = async (req, res) => {
  const catagory = await Catagory.find({}).populate("subCatagory");
  res.send({ catagory });
};
// ================ ===================== ================
// ================ Catagory By ID Start ================
// ================ ===================== ================

const CatagoryById = async (req, res) => {
  const { id } = req.body;
  try {
    const catagory = await Catagory.findOne({ _id: id }).populate("subCatagory").populate({
      path: "subCatagory.product",
      model: "Product",
    });
    if (!catagory) {
      return res.status(400).send({ error: "No such Catagory found!" });
    }
    res.send({ catagory });
  } catch (error) {
    return res.status(400).send({ error: "Something went wrong!" });
  }
};

// ================ ========================= ================
// ================ Render Sub Catagory Start ================
// ================ ========================= ================
const renderSubCatagory = async (req, res) => {
  const subCatagory = await SubCatagory.find({}).populate("catagory").populate("product");
  res.send({ subCatagory });
};
// ================ ===================== ================
// ================ Delete Catagory Start ================
// ================ ===================== ================
const deleteCatagory = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) return res.status(400).send({ error: "Something went wrong! Try again." });
    const catagory = await Catagory.findOneAndDelete({ _id: id });
    if (catagory.subCatagory.length > 0) {
      for (let i = 0; i < catagory.subCatagory.length; i++) {
        await SubCatagory.findOneAndDelete({ _id: catagory.subCatagory[i] });
      }
    }
    return res.status(200).send({ message: "Catagory deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "catch Something went wrong! Try again." });
  }
}
// ================ ===================== ================
// ================ Update Status Start ================
// ================ ===================== ================
const updateStatus = async (req, res) => {
  const { id } = req.body;
  try {
    const catagoryStatus = await Catagory.findOne({ _id: id });
    if (!catagoryStatus) {
      return res.status(400).send({ error: "Catagory not found!" });
    }
    else if (catagoryStatus.status === "waiting") {
      await Catagory.findByIdAndUpdate(catagoryStatus._id, { status: "published" });
      return res.status(200).send({ message: "Catagory Published Successfully!" });
    }
    else if (catagoryStatus.status === "published") {
      await Catagory.findByIdAndUpdate(catagoryStatus._id, { status: "waiting" });
      return res.status(201).send({ message: "Catagory become waiting!" });
    }
  } catch (err) {
    res.status(500).send({ error: "Failed! Please try again." });
  }
}
module.exports = { catagory, subCatagory, renderCatagory, renderSubCatagory, deleteCatagory, updateStatus, CatagoryById };
