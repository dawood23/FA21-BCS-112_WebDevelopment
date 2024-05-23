const express = require("express");
const server = express.Router();
let mainMiddleware = require("../middlewares/mainMiddleware");
let auth = require("../middlewares/checkAuth");
let Order = require("../models/order");

const PAGE_SIZE = 2;

server.get("/orders", auth, mainMiddleware, async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pageSize = PAGE_SIZE;
    let skip = (page - 1) * pageSize;

    let totalOrdersCount = await Order.countDocuments({
      user: req.session.user._id,
    });
    let totalPages = Math.ceil(totalOrdersCount / pageSize);

    let orders = await Order.find({ user: req.session.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate("items.item");

    res.render("orders", { orders, page, totalPages });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.get("/placeorder", auth, async (req, res) => {
  try {
    const orderData = req.cookies.order;
    const [itemsArr, totalPrice] = orderData;

    const order = new Order({
      user: req.session.user._id,
      status: "Pending",
      items: itemsArr.map(([item, quantity, price]) => ({
        item: item._id,
        quantity: parseInt(quantity),
        price: parseInt(price),
      })),
      totalPrice: parseInt(totalPrice),
    });

    await order.save();

    res.clearCookie("order");
    res.clearCookie("cart");

    res.redirect("/orders");
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.post("/cancelorder/:orderId", mainMiddleware, async (req, res) => {
  try {
    console.log("here");
    const orderId = req.params.orderId;

    await Order.findOneAndDelete({ _id: orderId, user: req.session.user._id });

    res.redirect("/orders");
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = server;
