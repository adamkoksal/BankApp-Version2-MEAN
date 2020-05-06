const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

require("dotenv").config();
require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/prod")(app);

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "./public/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
