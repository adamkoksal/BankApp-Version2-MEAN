const mongoose = require("mongoose");

const billPaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("billpay", billPaySchema);