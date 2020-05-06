const express = require("express");
const router = express.Router();
const {
  User,
  validateLogin,
  validateCheckPassword,
  validateCheckSQA,
} = require("../model/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  let user = await User.findOne({ username: req.body.username.toLowerCase() }).catch((err) =>
    console.log(err.message)
  );
  if (!user) return res.status(400).send("Invalid user password combination");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid)
    return res.status(400).send("Invalid user password combination");

  const token = user.createToken();
  res.send({ token: token, id: user._id });
});

router.post("/check-password", async (req, res) => {
  const { error } = validateCheckPassword(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  let user = await User.findById(req.body.id).catch((err) =>
    console.log(err.message)
  );
  if (!user) return res.send(false);

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.send(false);

  res.send(true);
});

router.post("/check-sqa", async (req, res) => {
  const { error } = validateCheckSQA(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  let user = await User.findById(req.body.id).catch((err) =>
    console.log(err.message)
  );
  if (!user) return res.send(false);

  const isValid = await bcrypt.compare(
    req.body.securityQuestionAnswer,
    user.securityQuestionAnswer
  );
  if (!isValid) return res.send(false);

  res.send(true);
});

module.exports = router;
