const mongoose = require("mongoose");
const Joi = require("joi");

const nameSchema = new mongoose.Schema({
  name:String,
  desc:String,
},{timestamps:true})

exports.NameModel = mongoose.model("names",nameSchema);

exports.validateName = (_reqbody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    desc:Joi.string().min(2).max(200).required(),
  })
  return joiSchema.validate(_reqbody)
}