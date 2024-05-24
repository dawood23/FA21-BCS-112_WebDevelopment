const express = require("express");
const router = express.Router();
let item = require("../models/items");
let order = require("../models/order");
let mainMiddleware = require("../middlewares/mainMiddleware");
let auth = require("../middlewares/checkAuth");

router.get("/additem", auth, (req, res) => {
  res.render("additem", { layout: false });
});

router.get("/order-update", auth, mainMiddleware, async (req, res) => {
  let orders = await order.find();
  res.render("adminorder", { layout: false, Orders: orders });
});

router.post("/update-status/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.redirect("/admin/order-update");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/additem", auth, async (req, res) => {
  try {
    let { category, name, img, description, options } = req.body;

    const newItem = new item({
      category,
      name,
      img,
      description,
      options,
    });

    await newItem.save();

    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/removeitem/:id", auth, async (req, res) => {
  try {
    const items = await item.findByIdAndDelete(req.params.id);
  } catch (e) {
    console.log(e);
  }
  return res.redirect("/admin");
});
module.exports = router;
