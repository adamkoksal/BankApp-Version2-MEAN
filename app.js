const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
require("dotenv").config();
require("./startup/logging")();
require("./startup/db")();
app.use(express.json());
require("./startup/routes")(app);
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
