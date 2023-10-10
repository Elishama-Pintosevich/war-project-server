const mongoose = require("mongoose");
const Joi = require("joi");

const rightSchema = new mongoose.Schema({
  one:Number,
  two:Number,
  three:Number
},{timestamps:true})

exports.RightModel = mongoose.model("rights",rightSchema);

exports.validateRight = (_reqbody) => {
  const joiSchema = Joi.object({
    one: Joi.number().min(0).max(999999).required(),
    two: Joi.number().min(0).max(999999).required(),
    three: Joi.number().min(0).max(999999).required(),
  })
  return joiSchema.validate(_reqbody)
}