const express = require("express");
const router = express.Router();
const { User, validate } = require("../Database/User");
const { Account } = require("../Database/Account");

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
  await new User(req.body)
    .save()
    .then(async (data) => {
      await Account({
        userId: data._id,
        name: "Checking",
      }).save();
      await Account({
        userId: data._id,
        name: "Savings",
      }).save();
      res.send(data);
    })
    .catch((err) => res.status(400).send(err.message));
});

module.exports = router;
