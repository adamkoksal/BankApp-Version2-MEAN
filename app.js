const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/db")();
app.use(express.json());
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
