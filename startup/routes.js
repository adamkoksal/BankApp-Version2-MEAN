const users = require("../routes/users");
const accounts = require("../routes/accounts");
const transactions = require("../routes/transactions");

module.exports = function (app) {
  app.use("/api/users", users);
  app.use("/api/accounts", accounts);
  app.use("/api/transactions", transactions);
};
