const express = require("../node_modules/express");
const router = express.Router();
const {
  Transaction,
  validateDeposit,
  validateWithdrawal,
  validateTransfer,
} = require("../model/Transaction");
const { Account } = require("../model/Account");

router.get("/:id", async (req, res) => {
  Transaction.find()
    .or([{ receiverId: req.params.id }, { initiatorId: req.params.id }])
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.post("/deposit", async (req, res) => {
  const { error } = validateDeposit(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const account = await Account.findById(req.body.receiverId).catch((err) =>
    console.log(err.message)
  );
  if (!account) return res.status(400).send("Invalid account Id");

  account
    .updateOne({ balance: account.balance + req.body.amount })
    .then(async () => {
      await new Transaction({
        amount: req.body.amount,
        receiverId: req.body.receiverId,
        type: "Deposit",
      }).save();
      res.send("Deposit successful.");
    })
    .catch((err) => res.status(400).send(err.message));
});

router.post("/withdrawal", async (req, res) => {
  const { error } = validateWithdrawal(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const account = await Account.findById(req.body.initiatorId).catch((err) =>
    console.log(err.message)
  );
  if (!account) return res.status(400).send("Invalid account Id");

  account
    .updateOne({ balance: account.balance - req.body.amount })
    .then(async () => {
      await new Transaction({
        amount: req.body.amount,
        initiatorId: req.body.initiatorId,
        type: "Withdrawal",
      }).save();
      res.send("Withdrawal successful.");
    })
    .catch((err) => res.status(400).send(err.message));
});

router.post("/transfer", async (req, res) => {
  const { error } = validateTransfer(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  if (req.body.receiverId === req.body.initiatorId)
    return res
      .status(400)
      .send("Receiver Id and Initiator Id cannot be the same.");

  const initiator = await Account.findById(req.body.initiatorId).catch((err) =>
    console.log(err.message)
  );
  if (!initiator) return res.status(400).send("Invalid Initiator Account Id");

  const receiver = await Account.findById(req.body.receiverId).catch((err) =>
    console.log(err.message)
  );
  if (!receiver) return res.status(400).send("Invalid Receiver Account Id");

  if (initiator.balance < req.body.amount)
    return res.status(400).send("Insufficient Funds");

  await initiator
    .updateOne({ balance: initiator.balance - req.body.amount })
    .then(async () => {
      await new Transaction({
        initiatorId: req.body.initiatorId,
        receiverId: req.body.receiverId,
        amount: req.body.amount,
        type: "Transfer",
      }).save();
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).send("Something went wrong. Check the console.");
    });

  await receiver
    .updateOne({ balance: receiver.balance + req.body.amount })
    .then(() => res.send("Transfer Successful"))
    .catch((err) => {
      console.log(err.message);
      res.status(400).send("Something went wrong. Check the console.");
    });
});

router.post("/bill-pay", async (req, res) => {
  const { error } = validateTransfer(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  if (req.body.receiverId === req.body.initiatorId)
    return res
      .status(400)
      .send("Receiver Id and Initiator Id cannot be the same.");

  const initiator = await Account.findById(req.body.initiatorId).catch((err) =>
    console.log(err.message)
  );
  if (!initiator) return res.status(400).send("Invalid Initiator Account Id");

  const receiver = await Account.findById(req.body.receiverId).catch((err) =>
    console.log(err.message)
  );
  if (!receiver) return res.status(400).send("Invalid Receiver Account Id");

  if (initiator.balance < req.body.amount)
    return res.status(400).send("Insufficient Funds");

  await initiator
    .updateOne({ balance: initiator.balance - req.body.amount })
    .then(async () => {
      await new Transaction({
        initiatorId: req.body.initiatorId,
        receiverId: req.body.receiverId,
        amount: req.body.amount,
        type: "Bill Pay",
      }).save();
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).send("Something went wrong. Check the console.");
    });

  await receiver
    .updateOne({ balance: receiver.balance + req.body.amount })
    .then(() => res.send("Bill Pay Successful"))
    .catch((err) => {
      console.log(err.message);
      res.status(400).send("Something went wrong. Check the console.");
    });
});

module.exports = router;
