const express = require("express");
const router = express.Router();
const BillPay = require("../model/BillPay");

router.get("/", async (req, res) => {
  await BillPay.find()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.post("/", async (req, res) => {
  await new BillPay(req.body)
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

module.exports = router;
