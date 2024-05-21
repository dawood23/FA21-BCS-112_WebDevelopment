const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectMongo = require("./mongoose");
let ejsLayouts = require("express-ejs-layouts");
let checkAuth = require("./middlewares/checkAuth");
let mainMiddleware = require("./middlewares/mainMiddleware");
let initmid = require("./middlewares/init-middleware");
let item = require("./models/items");
let Order = require("./models/order");

connectMongo();

server.set("view engine", "ejs");
server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded());
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.use(
  session({
    key: "foodies",
    secret: "This is the secret Key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

server.get("/", initmid, (req, res) => {
  res.render("home", { title: "Home" });
});

server.get("/home", checkAuth, mainMiddleware, (req, res) => {
  res.render("home", { title: "Home" });
});

server.get("/menu", mainMiddleware, (req, res) => {
  res.render("menu", { title: "menu" });
});

server.get("/about", mainMiddleware, (req, res) => {
  res.render("about", { title: "About Us" });
});

server.get("/contact", mainMiddleware, (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

server.get("/admin", (req, res) => {
  res.render("admin", { layout: false });
});

server.use("/user", require("./routes/users"));

const itemRouter = require("./routes/item");

server.use("/items", itemRouter);

server.get("/cart", checkAuth, async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];

  let itemsArr = [];
  let Total = 0;
  for (let i = 0; i < cart.length; i++) {
    let itemInfo = await item.findOne({ name: cart[i][0] });
    let quantity = cart[i][1];
    let price = cart[i][2];

    if (itemInfo) {
      itemsArr.push([itemInfo, quantity, price]);
    }
    Total += parseInt(price) * parseInt(quantity);
  }
  res.cookie("order", [itemsArr, Total]);
  console.log([itemsArr, Total]);
  res.render("cart", { items: itemsArr, total: Total });
});

const PAGE_SIZE = 2;

server.get("/orders", mainMiddleware, async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1; // Extract page from query params
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

server.get("/placeorder", async (req, res) => {
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

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.listen(5000, () => {
  console.log("Started Listening At 5000");
});
