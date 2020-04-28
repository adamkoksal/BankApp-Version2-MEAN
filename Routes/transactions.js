const express = require("../node_modules/express");
const router = express.Router();
const { Transaction, validateDeposit, validateWithdrawal } = require("../model/Transaction");
const { Account } = require("../model/Account");

//Deposit ve digerleriyle devam edilecek

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
  if (!account) return res.status(400).send("Account does not exist");

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
    if (!account) return res.status(400).send("Account does not exist");
  
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

module.exports = router;
