const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.use(express.static("public"));
router.get("/Login", (req, res) => {
  res.render("Login");
});

router.get("/SignUp", (req, res) => {
  res.render("SignUp");
});

router.post("/SignUp", async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

module.exports = router;
