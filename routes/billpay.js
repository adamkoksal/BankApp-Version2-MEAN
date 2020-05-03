const express = require("express");
const router = express.Router();
const BillPay = require("../model/BillPay");

router.post("/", async (req, res) => {
  await new BillPay(req.body)
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

module.exports = router;
