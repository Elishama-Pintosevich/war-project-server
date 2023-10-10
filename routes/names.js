const express = require("express");
const router = express.Router();
const { validateName,NameModel } = require("../models/nameModel");

router.get("/", async(req,res) => {
    try{
      //?limit=X&page=X&sort=X&reveres=yes
      const limit = req.query.limit || 10;
      const page = req.query.page - 1 || 0;
      const sort = req.query.sort || "_id";
      const reverse = req.query.reverse == "yes" ? 1 : -1;
  
      let filteFind = {};
      // בודק אם הגיע קווארי לחיפוש ?s=
      const data = await NameModel
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
  router.get("/count", async(req,res) => {
    try{
      const count = await NameModel.countDocuments({})
      res.json({count})
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })
  router.post("/addName", async(req, res)=>{
    const validBody = validateName(req.body)
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    const name = new NameModel(req.body);
    // להוסיף מאפיין של יוזר איי די לרשומה
    await name.save()
    res.status(201).json(name);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
  })


module.exports = router;