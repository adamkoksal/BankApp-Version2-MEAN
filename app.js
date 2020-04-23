const express = require("express");
const app = express();
const ConnectDB = require("./Database/Connection");
const users = require("./Routes/users");
const accounts = require("./Routes/accounts");
const transactions = require("./Routes/transactions");

ConnectDB();
app.use(express.json());
app.use("/api/users", users);
app.use("/api/accounts", accounts);                      
app.use("/api/transactions", transactions);                      

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`)); 