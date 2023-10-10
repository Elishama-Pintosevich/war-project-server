const express = require("express");
const router = express.Router();
const { validateRight ,RightModel } = require("../models/rightModel");

router.get("/", async(req,res) => {
    try{
        let filteFind = {};
        const data = await RightModel
        .find(filteFind)
        res.json(data);
      }
      catch(err){
        console.log(err);
        res.status(502).json({err})
      }
})
router.put("/setRights/:id", async(req, res)=>{
    const validBody = validateRight(req.body)
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    const id = req.params.id;
    // ,user_id:req.tokenData._id - דואג שרק בעל הרשומה יוכל
    // לשנות את הרשומה לפי הטוקן
    const data = await RightModel.updateOne({_id:id},req.body);
    // "modifiedCount": 1, אומר שהצליח כשקיבלנו
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;