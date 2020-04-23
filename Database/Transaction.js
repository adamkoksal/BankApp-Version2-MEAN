const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    initiatorId: {
        type: mongoose.Types.ObjectId
    },
    receiverId: {
        type: mongoose.Types.ObjectId
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("transaction", transactionSchema);