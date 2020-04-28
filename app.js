const express = require("express");
const app = express();
const users = require("./routes/users");
const accounts = require("./routes/accounts");
const transactions = require("./routes/transactions");

require("./startup/db")();

app.use(express.json());
app.use("/api/users", users);
app.use("/api/accounts", accounts);                      
app.use("/api/transactions", transactions);                      

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`)); 