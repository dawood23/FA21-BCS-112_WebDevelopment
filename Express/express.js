const express = require("express");
const server = express();
const mongoose = require("mongoose");
let ejsLayouts = require("express-ejs-layouts");

const func = async () => {
  const connection = await mongoose
    .connect(
      "mongodb+srv://dawood:03348757377d@cluster0.nlusybm.mongodb.net/test"
    )
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log("Unable to connect", err);
    });
};

func().then(() => {
  server.set("view engine", "ejs");
  server.use(express.static("public"));
  server.use(ejsLayouts);

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

  const itemRouter = require("./routes/item");

  server.use("/items", itemRouter);

  server.listen(5000, () => {
    console.log("Started Listening At 3000");
  });
});
