const mongoose = require("mongoose");
const Joi = require("joi");
//שם מסכת, כמות דפים, מערך באורך כמות הדפים, 
const tractateSchema = new mongoose.Schema({
  name:String,
  count:Number,
  pages:[Number],
  amud:String
},{timestamps:true})

exports.TractateModel = mongoose.model("tractates",tractateSchema);

exports.validateTractate = (_reqbody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    count:Joi.number().min(2).max(500).required(),
    pages:Joi.array().items(Joi.number()).required(),
    amud:Joi.string().min(2).max(100).required()
  })
  return joiSchema.validate(_reqbody)
}