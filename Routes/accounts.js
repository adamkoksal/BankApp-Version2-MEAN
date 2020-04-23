const express = require("express");
const router = express.Router();
const { Account, validate } = require("../Database/Account");
const { User } = require("../Database/User");

router.get("/", async (req, res) => {
  await Account.find()
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.get("/:id", async (req, res) => {
  await Account.findById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);
// Burda bi sikinti var
  const user = await User.findById(req.body.userId).catch((err) =>
    console.log(err.message)
  );
  if (!user) return res.status(400).send("User does not exist");

  await new Account(req.body)
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = router;

// JOI VALIDATION
