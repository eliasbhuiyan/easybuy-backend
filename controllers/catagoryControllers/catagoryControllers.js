const Catagory = require("../../modal/catagorySchema.js.js");
const SubCatagory = require("../../modal/subCatagory.js");
// ================ ===================== ================
// ================ Create Catagory Start ================
// ================ ===================== ================
const catagory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ error: "Name is required!" });
  }
  const existingCatagory = await Catagory.find({ name });
  if (existingCatagory.length > 0) {
    return res.status(400).send({
      error: "Catagory already in used!, please try with another Catagory",
    });
  }

  const catagory = new Catagory({
    name,
    description,
  });
  catagory.save();
  res.status(200).send({ message: "Catagory created successfully!" });
};

// ================ ========================= ================
// ================ Create Sub Catagory Start ================
// ================ ========================= ================
const subCatagory = async (req, res) => {
  const { name, catagory } = req.body;
  if (!name || !catagory) {
    return res.status(400).send({ error: "All fields are required" });
  }
  const existingSubCatagory = await SubCatagory.find({ name });
  if (existingSubCatagory.length > 0) {
    return res.status(400).send({ error: "Sub Catagory already in used !" });
  }

  const subCatagory = new SubCatagory({
    name,
    catagory,
  });
  subCatagory.save();
  await Catagory.findOneAndUpdate(
    { _id: subCatagory.catagory },
    { $push: { subCatagory: subCatagory._id } }
  );
  res.status(200).send({ message: "Sub Catagory created successfully!" });
};

// ================ ===================== ================
// ================ Render Catagory Start ================
// ================ ===================== ================

const renderCatagory = async (req, res) => {
  const catagory = await Catagory.find({}).populate("subCatagory");
  res.send({ catagory });
};

// ================ ========================= ================
// ================ Render Sub Catagory Start ================
// ================ ========================= ================
const renderSubCatagory = async (req, res) => {
  const subCatagory = await SubCatagory.find({}).populate("catagory");
  res.send({ subCatagory });
};

module.exports = { catagory, subCatagory, renderCatagory, renderSubCatagory };
