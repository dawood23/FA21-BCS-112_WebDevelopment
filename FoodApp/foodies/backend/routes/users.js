const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    body("email", "Invalid Email Format").isEmail(),
    body("password", "Password Too Short").isLength({ min: 5 }),
    body("name").isLength({ min: 2 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        number: req.body.number,
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create user" });
    }
  }
);

module.exports = router;
