const mongoose = require("mongoose");
const Joi = require("joi");

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
});

function validate(body) {
  const schema = {
    userId: Joi.string().required(),
    name: Joi.string().required(),
  };
  return Joi.validate(body, schema);
}

function validatePut(body) {
  const schema = {
    name: Joi.string().required(),
  };
  return Joi.validate(body, schema);
}

exports.Account = mongoose.model("account", accountSchema);
exports.validate = validate;
exports.validatePut = validatePut;
