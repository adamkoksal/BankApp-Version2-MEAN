const express = require("../node_modules/express");
const router = express.Router();
const { Account, validate, validatePut } = require("../model/Account");
const { User } = require("../model/User");

router.get("/", async (req, res) => {
  if (req.query.userId) {
    await Account.find({ userId: req.query.userId })
      .then((data) => res.send(data))
      .catch((err) => res.status(400).send(err.message));
  } else {
    await Account.find()
      .then((data) => res.send(data))
      .catch((err) => res.status(400).send(err.message));
  }
});

router.get("/:id", async (req, res) => {
  await Account.findById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const user = await User.findById(req.body.userId).catch((err) =>
    console.log(err.message)
  );
  if (!user) return res.status(400).send("User does not exist");

  await new Account(req.body)
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.put("/:id", async (req, res) => {
  const { error } = validatePut(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  await Account.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.send("Account name update successful"))
    .catch((err) => res.status(400).send(err.message));
});

router.delete("/:id", async (req, res) => {
  await Account.findByIdAndDelete(req.params.id)
    .then(() => res.send("Account deleted"))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = router;
