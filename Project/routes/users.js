const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.use(express.static("public"));

router.get("/Login", (req, res) => {
  res.render("Login", { layout: false });
});

router.post("/Login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.redirect("/SignUp");
  if (user.password != req.body.password) return res.redirect("/user/Login");
  console.log(user);
  // req.session.user = user;
  return res.redirect("/");
});

router.get("/SignUp", (req, res) => {
  res.render("SignUp", { layout: false });
});

router.post("/SignUp", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  let hashpassword = await bcrypt.hash(req.body.password, salt);
  try {
    console.log(req.body);
    const user = new User({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      password: hashpassword,
      number: req.body.number,
    });
    await user.save();
    res.redirect("/Login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

module.exports = router;
