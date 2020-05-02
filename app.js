const express = require("express");
const app = express();

require("dotenv").config();
require("./startup/logging")();
require("./startup/db")();
app.use(express.json());
require("./startup/routes")(app);
require("./startup/prod")(app);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
