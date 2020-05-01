const mongoose = require("mongoose");
const Joi = require("joi");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  initiatorId: {
    type: mongoose.Types.ObjectId,
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

exports.validateDeposit = function (body) {
  const schema = {
    receiverId: Joi.string().required(),
    amount: Joi.number().required(),
  };
  return Joi.validate(body, schema);
};

exports.validateWithdrawal = function (body) {
  const schema = {
    initiatorId: Joi.string().required(),
    amount: Joi.number().required(),
  };
  return Joi.validate(body, schema);
};

exports.validateTransfer = function (body) {
  const schema = {
    initiatorId: Joi.string().required(),
    receiverId: Joi.string().required(),
    amount: Joi.number().required(),
  };
  return Joi.validate(body, schema);
};

exports.Transaction = mongoose.model("transaction", transactionSchema);
