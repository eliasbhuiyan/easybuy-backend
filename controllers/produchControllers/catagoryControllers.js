const Catagory = require('../../modal/catagorySchema.js')
const SubCatagory = require('../../modal/subCatagory.js')
// ================ ===================== ================
// ================ Create Catagory Start ================
// ================ ===================== ================
const catagory = async (req, res) => {
    const {name, description} = req.body;
    const existingCatagory = await Catagory.find({name});
    if(existingCatagory.length > 0){
        return res.send({error: 'Catagory already in used, please try with another Catagory'})
    }

    const catagory = new Catagory({
        name,
        description,
    })
    catagory.save()
    res.send({message: 'Catagory created'})
}

// ================ ========================= ================
// ================ Create Sub Catagory Start ================
// ================ ========================= ================
const subCatagory = async (req, res) => {
    const {name, description, catagory} = req.body;
    const existingSubCatagory = await SubCatagory.find({name});
    if(existingSubCatagory.length > 0){
        return res.send({error: 'Sub Catagory already in used !'})
    }
    
    const subCatagory = new SubCatagory({
        name,
        description,
        catagory
    })
    subCatagory.save()
    await Catagory.findOneAndUpdate({_id: subCatagory.catagory}, {$push: {subCatagory: subCatagory._id}});
    res.send({message: 'Sub Catagory created'})
}

// ================ ===================== ================
// ================ Render Catagory Start ================
// ================ ===================== ================

const renderCatagory = async (req, res) => {
    const catagory = await Catagory.find({}).populate('subCatagory')
    res.send({catagory})
}

// ================ ========================= ================
// ================ Render Sub Catagory Start ================
// ================ ========================= ================
const renderSubCatagory = async (req, res) => {
    const subCatagory = await SubCatagory.find({}).populate('catagory')
    res.send({subCatagory})
}



module.exports = {catagory,subCatagory,renderCatagory, renderSubCatagory}