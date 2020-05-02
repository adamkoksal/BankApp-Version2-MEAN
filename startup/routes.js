const users = require("../Routes/users");
const accounts = require("../Routes/accounts");
const transactions = require("../Routes/transactions");
const auth = require("../Routes/auth");

module.exports = function (app) {
  app.use("/api/users", users);
  app.use("/api/accounts", accounts);
  app.use("/api/transactions", transactions);
  app.use("/api/auth", auth);
};
