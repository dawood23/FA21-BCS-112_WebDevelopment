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
  if (user.isAdmin) {
    if (req.body.password == user.password) {
      req.session.user = user;
      return res.redirect("/admin/order-update");
    }
    return res.redirect("/user/login");
  }
  const passCompare = await bcrypt.compare(req.body.password, user.password);
  if (!passCompare) {
    return res.redirect("/user/Login");
  }
  console.log(user);

  req.session.user = user;
  return res.redirect("/");
});

router.get("/SignUp", (req, res) => {
  res.render("SignUp", { layout: false });
});

router.post("/SignUp", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login." });
    }

    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      password: hashpassword,
      number: req.body.number,
      isAdmin: false,
    });
    await user.save();
    res.redirect("/user/Login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});

module.exports = router;
