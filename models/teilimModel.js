const mongoose = require("mongoose");
const Joi = require("joi");
//שם מסכת, כמות דפים, מערך באורך כמות הדפים, 
const teilimSchema = new mongoose.Schema({
  name:String,
  count:Number,
  pages:[Number],
},{timestamps:true})

exports.TeilimModel = mongoose.model("teilims",teilimSchema);

exports.validateTeilim = (_reqbody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    count:Joi.number().min(2).max(500).required(),
    pages:Joi.array().items(Joi.number()).required(),
  })
  return joiSchema.validate(_reqbody)
}