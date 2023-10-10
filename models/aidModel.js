const mongoose = require("mongoose");
const Joi = require("joi");

const aidSchema = new mongoose.Schema({
  name:String,
  desc:String,
},{timestamps:true})

exports.AidModel = mongoose.model("aids",aidSchema);

exports.validateAid = (_reqbody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(500).required(),
    desc:Joi.string().min(2).max(200).required(),
  })
  return joiSchema.validate(_reqbody)
}