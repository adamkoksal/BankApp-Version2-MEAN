const express = require("express");
const router = express.Router();
const {
  User,
  validatePost,
  validateUsername,
  validatePassword,
  validateAddress,
  validateSecurityQuestion,
} = require("../model/User");
const { Account } = require("../model/Account");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  if (req.query.username) {
    const user = await User.find({
      username: new RegExp("\\b" + req.query.username + "\\b", "i"),
    })
    .then(data => res.send(data))
    .catch((err) => res.status(400).send(err.message));
    
  } else {
    await User.find()
      .then((data) => res.send(data))
      .catch((err) => res.status(400).send(err.message));
  }
});

router.get("/:id", async (req, res) => {
  await User.findById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.post("/", async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const salt = await bcrypt.genSalt(10);

  await new User({
    username: req.body.username.toLowerCase(),
    password: await bcrypt.hash(req.body.password, salt),
    address: req.body.address,
    securityQuestion: req.body.securityQuestion,
    securityQuestionAnswer: await bcrypt.hash(
      req.body.securityQuestionAnswer,
      salt
    ),
  })
    .save()
    .then(async (data) => {
      await new Account({
        userId: data._id,
        name: "Checking",
      }).save();
      await new Account({
        userId: data._id,
        name: "Savings",
      }).save();
      res.send(data);
    })
    .catch((err) => res.status(400).send(err.message));
});

router.put("/username/:id", async (req, res) => {
  const { error } = validateUsername(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  await User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.send("Username update successful"))
    .catch((err) => res.status(400).send(err.message));
});

router.put("/password/:id", async (req, res) => {
  const { error } = validatePassword(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const salt = await bcrypt.genSalt(10);

  await User.findByIdAndUpdate(req.params.id, {
    password: await bcrypt.hash(req.body.password, salt),
  })
    .then(() => res.send("Password update successful"))
    .catch((err) => res.status(400).send(err.message));
});

router.put("/address/:id", async (req, res) => {
  const { error } = validateAddress(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  await User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.send("Address update successful"))
    .catch((err) => res.status(400).send(err.message));
});

router.put("/security-question/:id", async (req, res) => {
  const { error } = validateSecurityQuestion(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const salt = await bcrypt.genSalt(10);

  update = {
    securityQuestion: req.body.securityQuestion,
    securityQuestionAnswer: await bcrypt.hash(
      req.body.securityQuestionAnswer,
      salt
    ),
  };
  await User.findByIdAndUpdate(req.params.id, update)
    .then(() => res.send("Security Question update successful"))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = router;
