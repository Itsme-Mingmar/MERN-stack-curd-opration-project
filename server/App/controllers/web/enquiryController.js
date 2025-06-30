const enquiryModel = require('../../models/enquiry.model')
let enquiryInsert= async (req,res)=>{
    try {
        let enquiry = new enquiryModel({  
            name: req.body.sName,   
            email: req.body.sEmail, 
            phone: req.body.sPhone, 
            message: req.body.sMessage
        });

        let result = await enquiry.save();
        console.log(result);
        res.status(201).json({
            status: 1,
            msg: "Data received and saved successfully",
            data: result
        });
    } catch (error) {
        console.error("Error saving data:", error.message);
        res.status(400).json({ status: 0, msg: "Validation failed", error: error.message });
    }

}
let enquiryList = async (req, res)=>{
    let enquiry = await enquiryModel.find();
    res.send({status:1, enquiryList:enquiry});
}
let enquiryDelete = async (req,res)=>{
    let enId = req.params.id;
    let enquiry = await enquiryModel.deleteOne({_id: enId});
    res.send({status: 1, message: "Enquiry deleted successfully", enquiry})
}
let enquiryEdit = async (req, res) => {
  let enId = req.params.id;
  try {
    let enquiry = await enquiryModel.findOne({ _id: enId });
    res.send({ status: 1, enquiry });
  } catch (err) {
    res.status(500).send({ status: 0, message: "Error retrieving enquiry", error: err.message });
  }
}
let enquiryUpdate = async (req, res) => {
  let enId = req.params.id;
  let updated = await enquiryModel.updateOne({ _id: enId }, {
    $set: {
      name: req.body.sName,
      email: req.body.sEmail,
      phone: req.body.sPhone,
      message: req.body.sMessage
    }
  });
  res.send({ status: 1, message: "Enquiry updated", updated });
};
module.exports = { enquiryInsert, enquiryList, enquiryDelete,enquiryEdit, enquiryUpdate };