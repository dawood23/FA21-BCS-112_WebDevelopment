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
  res.render("cart", { items: itemsArr, total: Total });
});

server.use("/", require("./routes/order"));
server.listen(5000, () => {
  console.log("Started Listening At 5000");
});
