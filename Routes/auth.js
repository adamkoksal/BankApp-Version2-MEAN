const express = require("express");
const router = express.Router();
const { User, validateLogin } = require("../model/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  let user = await User.findOne({ username: req.body.username }).catch((err) =>
    res.status(400).send(err.message)
  );
  if (!user) return res.status(400).send("Invalid user password combination");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid)
    return res.status(400).send("Invalid user password combination");

  const token = user.createToken();
  res.send({ token: token, id: user._id });
});

module.exports = router;
