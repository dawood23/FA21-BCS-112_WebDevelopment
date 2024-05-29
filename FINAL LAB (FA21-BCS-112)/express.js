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
let product = require("./models/products");

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

server.get("/", initmid, mainMiddleware, async (req, res) => {
  let products = await product.find({ isFeatured: true });
  res.render("home", { title: "Home", featuredProducts: products });
});

server.get("/home", checkAuth, mainMiddleware, async (req, res) => {
  let products = await product.find({ isFeatured: true });
  res.render("home", { title: "Home", featuredProducts: products });
});

server.get("/products/:id", mainMiddleware, async (req, res) => {
  const productId = req.params.id;

  try {
    const productDetails = await product.findById(productId);

    let visitedItems = req.session.visited;
    if (!visitedItems) {
      visitedItems = [];
    }
    if (!productDetails) {
      return res.status(404).send("Product not found");
    }
    const isVisited = visitedItems.includes(productDetails._id.toString());
    if (!isVisited) {
      visitedItems.push(productDetails._id);
      req.session.visited = visitedItems;
    }
    res.render("singleitem", { product: productDetails, layout: false });
  } catch (error) {
    console.log(error);
  }
});

server.get("/visited-products", mainMiddleware, async (req, res) => {
  let visitedproducts = req.session.visited;

  if (!visitedproducts) {
    return res.send("There are no visited products");
  }
  try {
    let products = await product.find({ _id: { $in: visitedproducts } });

    if (!products || products.length === 0) {
      return res.send("No products found for the visited IDs");
    }

    res.render("visited-products", { Products: products });
  } catch (error) {
    console.error("Error fetching visited products:", error);
    res.status(500).send("Internal Server Error");
  }
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

server.get("/admin", checkAuth, mainMiddleware, async (req, res) => {
  let items = await item.find();
  res.render("admin", { layout: false, item: items });
});

server.use("/admin", require("./routes/admin"));

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

server.listen(4000, () => {
  console.log("Started Listening At 4000");
});
