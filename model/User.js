const mongoose = require("mongoose");
const Joi = require("joi");

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 55,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 55,
  },
  address: {
    type: String,
    required: true,
    max: 55,
  },
  securityQuestion: {
    type: String,
    required: true,
    min: 3,
    max: 55,
  },
  securityQuestionAnswer: {
    type: String,
    required: true,
    min: 3,
    max: 55,
  },
});

module.exports = function validatePost(body) {
  const schema = {
    username: Joi.string().required().min(3).max(55),
    password: Joi.string().required().min(6).max(55),
    address: Joi.string().required().max(55),
    securityQuestion: Joi.string().required().min(3).max(55),
    securityQuestionAnswer: Joi.string().required().min(3).max(55),
  };
  return Joi.validate(body, schema);
};

module.exports = function validateUsername(body) {
  const schema = {
    username: Joi.string().required().min(3).max(55),
  };
  return Joi.validate(body, schema);
};

module.exports = function validatePassword(body) {
  const schema = {
    password: Joi.string().required().min(6).max(55),
  };
  return Joi.validate(body, schema);
};

module.exports = function validateAddress(body) {
  const schema = {
    address: Joi.string().required().max(55),
  };
  return Joi.validate(body, schema);
};

module.exports = function validateSecurityQuestion(body) {
  const schema = {
    SecurityQuestion: Joi.string().required().min(3).max(55),
    SecurityQuestionAnswer: Joi.string().required().min(3).max(55),
  };
  return Joi.validate(body, schema);
};

exports.User = mongoose.model("user", userSchema);
