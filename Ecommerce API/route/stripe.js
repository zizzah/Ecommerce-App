/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const router = require("express").Router();
const stripe = required("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "NGN",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

router.post("/payments", async (req, res) => {
  try {
    const stripeRes = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "NGN",
    });
    res.status(200).json(stripeRes);
  } catch (stripeErr) {
    res.status(500).json(stripeErr);
  }
});

module.exports = router;
