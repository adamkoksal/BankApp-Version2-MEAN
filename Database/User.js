const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  securityQuestion: {
    type: String,
    required: true,
  },
  securityQuestionAnswer: {
    type: String,
    required: true,
  },
});

function validate(body) {
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
    securityQuestion: Joi.string().required(),
    securityQuestionAnswer: Joi.string().required(),
  }
  return Joi.validate(body, schema);
}

exports.User = mongoose.model("user", userSchema);
exports.validate = validate;
