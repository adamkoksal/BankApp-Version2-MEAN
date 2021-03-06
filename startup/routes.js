const users = require("../routes/users");
const accounts = require("../routes/accounts");
const transactions = require("../routes/transactions");
const auth = require("../routes/auth");


module.exports = function (app) {
  app.use("/api/users", users);
  app.use("/api/accounts", accounts);
  app.use("/api/transactions", transactions);
  app.use("/api/auth", auth);
  app.use("/api/bill-pay", require("../routes/billpay"));
};
