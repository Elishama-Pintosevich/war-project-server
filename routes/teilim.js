const express = require("express");
const router = express.Router();
const { validateTeilim , TeilimModel} = require("../models/teilimModel");

router.get("/", async(req,res) => {
  try{
    //?limit=X&page=X&sort=X&reveres=yes
    const limit = req.query.limit || 10;
    const page = req.query.page - 1 || 0;
    const sort = req.query.sort || "_id";
    const reverse = req.query.reverse == "yes" ? 1 : -1;

    let filteFind = {};
    // בודק אם הגיע קווארי לחיפוש ?s=
    const data = await TeilimModel
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
    const data = await TeilimModel
    .find({_id:req.params.id})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
router.post("/addBook", async(req, res)=>{
  const validBody = validateTeilim(req.body)
if(validBody.error){
  return res.status(400).json(validBody.error.details);
}
try{
  const tractate = new TeilimModel(req.body);
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
  const validBody = validateTeilim(req.body)
if(validBody.error){
  return res.status(400).json(validBody.error.details);
}
try{
  const id = req.params.id;
  // ,user_id:req.tokenData._id - דואג שרק בעל הרשומה יוכל
  // לשנות את הרשומה לפי הטוקן
  const data = await TeilimModel.updateOne({_id:id},req.body);
  // "modifiedCount": 1, אומר שהצליח כשקיבלנו
  res.json(data);
}
catch(err){
  console.log(err);
  res.status(502).json({err})
}
})


module.exports = router;