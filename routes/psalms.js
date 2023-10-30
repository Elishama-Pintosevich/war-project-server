const express = require("express");
const router = express.Router();
const psalms = require("../psalmsJson/allPsalms.json")

router.get("/", async(req,res) => {
  res.json(psalms)
})

module.exports = router;