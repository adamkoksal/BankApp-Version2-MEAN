const mongoose = require("mongoose");

const URL =
  "mongodb+srv://akoksal:akoksal@mycluster-jptjg.mongodb.net/BankApp?retryWrites=true&w=majority";

module.exports = async function() {
    await mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected to DB..."))
    .catch((err) => console.log("Error connecting to DB..."));
}



