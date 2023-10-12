const express = require("express");
const router = express.Router();
const { validateTractate , TractateModel} = require("../models/tractateModel");

router.get("/", async(req,res) => {
  try{
    //?limit=X&page=X&sort=X&reveres=yes
    const limit = req.query.limit || 10;
    const page = req.query.page - 1 || 0;
    const sort = req.query.sort || "_id";
    const reverse = req.query.reverse == "yes" ? 1 : -1;

    let filteFind = {};
    // בודק אם הגיע קווארי לחיפוש ?s=
    const data = await TractateModel
    .find(filteFind)
    .limit(limit)
    .skip(page * limit)
    .sort({[sort]:reverse})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
router.get("/single/:id", async(req, res)=>{
  try{
    const data = await TractateModel
    .find({_id:req.params.id})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
router.post("/addTractate", async(req, res)=>{
  const validBody = validateTractate(req.body)
if(validBody.error){
  return res.status(400).json(validBody.error.details);
}
try{
  const tractate = new TractateModel(req.body);
  // להוסיף מאפיין של יוזר איי די לרשומה
  await tractate.save()
  res.status(201).json(tractate);
}
catch(err){
  console.log(err);
  res.status(502).json({err})
}
})
router.put("/setPages/:id", async(req, res)=>{
  const validBody = validateTractate(req.body)
if(validBody.error){
  return res.status(400).json(validBody.error.details);
}
try{
  const id = req.params.id;
  // ,user_id:req.tokenData._id - דואג שרק בעל הרשומה יוכל
  // לשנות את הרשומה לפי הטוקן
  const data = await TractateModel.updateOne({_id:id},req.body);
  // "modifiedCount": 1, אומר שהצליח כשקיבלנו
  res.json(data);
}
catch(err){
  console.log(err);
  res.status(502).json({err})
}
})


module.exports = router;