const express = require("express");
const server = express();
const connectMongo = require("./mongoose");
let ejsLayouts = require("express-ejs-layouts");

connectMongo();

server.set("view engine", "ejs");
server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded());
server.use(express.static("public"));

server.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

server.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

server.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

server.get("/check", (req, res) => {
  res.render("check");
});

server.use("/user", require("./routes/users"));

const itemRouter = require("./routes/item");

server.use("/items", itemRouter);

server.listen(5000, () => {
  console.log("Started Listening At 5000");
});
