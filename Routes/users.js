const express = require("../node_modules/express");
const router = express.Router();
const { User, validate } = require("../model/User");
const { Account } = require("../model/Account");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  if (req.query.username) {
    await User.find({
      username: new RegExp("\\b" + req.query.username + "\\b", "i"),
    })
      .then((data) => res.send(data))
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
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const salt = await bcrypt.genSalt(10);

  await new User({
    username: req.body.username.toLowerCase(),
    password: await bcrypt.hash(req.body.password, salt),
    address: req.body.address,
    securityQuestion: req.body.securityQuestion,
    securityQuestionAnswer: await bcrypt.hash(req.body.securityQuestionAnswer),
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

// Put methodlarina basla

module.exports = router;
