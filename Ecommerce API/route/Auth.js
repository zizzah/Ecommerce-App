/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const User = require("../model/Users");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
// Register user

const router = express.Router();

router.post("/register", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: cryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASSORD_SEC
    ).toString(),
  });

  try {
    const saveUser = await newUser.save();
    console.log(saveUser);
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      res.status(401).json("No Customer with such username");
    } else {
      const hashedPassword = cryptoJs.AES.decrypt(
        user.password,
        process.env.PASSORD_SEC
      );

      const decPassword = hashedPassword.toString(cryptoJs.enc.Utf8);
      if (password !== decPassword) {
        res.status(401).json("wrong credentials");
      } else {
        const { password, ...others } = user._doc;

        const accessToken = jwt.sign(
          { id: user._id, admin: user.isAdmin },
          process.env.JWT_SECT_KEY,
          { expiresIn: "3d" }
        );

        res.status(200).json({ ...others, accessToken });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
