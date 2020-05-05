const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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

userSchema.methods.createToken = function () {
  return jwt.sign({ _id: this.id }, process.env.vidly_jwtPrivateKey);
};

function validatePost(body) {
  const schema = {
    username: Joi.string().required().min(3).max(55),
    password: Joi.string().required().min(6).max(55),
    address: Joi.string().required().max(55),
    securityQuestion: Joi.string().required().min(3).max(55),
    securityQuestionAnswer: Joi.string().required().min(3).max(55),
  };
  return Joi.validate(body, schema);
}

function validateLogin(body) {
  const schema = {
    username: Joi.string().required().min(3).max(55),
    password: Joi.string().required().min(6).max(55),
  };
  return Joi.validate(body, schema);
}

function validateCheckPassword(body) {
  const schema = {
    id: Joi.string().required().min(3).max(55),
    password: Joi.string().required().min(6).max(55),
  };
  return Joi.validate(body, schema);
}

function validateUsername(body) {
  const schema = {
    username: Joi.string().required().min(3).max(55),
  };
  return Joi.validate(body, schema);
}

function validatePassword(body) {
  const schema = {
    password: Joi.string().required().min(6).max(55),
  };
  return Joi.validate(body, schema);
}

function validateAddress(body) {
  const schema = {
    address: Joi.string().required().max(55),
  };
  return Joi.validate(body, schema);
}

function validateSecurityQuestion(body) {
  const schema = {
    securityQuestion: Joi.string().required().min(3).max(55),
    securityQuestionAnswer: Joi.string().required().min(3).max(55),
  };
  return Joi.validate(body, schema);
}

function validateCheckSQA(body) {
  const schema = {
    id: Joi.string().required().min(3).max(55),
    securityQuestionAnswer: Joi.string().required().min(6).max(55),
  };
  return Joi.validate(body, schema);
}


module.exports.User = mongoose.model("user", userSchema);
module.exports.validatePost = validatePost;
module.exports.validateLogin = validateLogin;
module.exports.validateCheckPassword = validateCheckPassword;
module.exports.validateUsername = validateUsername;
module.exports.validatePassword = validatePassword;
module.exports.validateAddress = validateAddress;
module.exports.validateSecurityQuestion = validateSecurityQuestion; 
module.exports.validateCheckSQA = validateCheckSQA; 
