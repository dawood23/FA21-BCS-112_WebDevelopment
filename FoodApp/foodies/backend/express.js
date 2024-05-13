const express = require("express");
const app = express();
const connectMongo = require("./mongoose");
const cors = require("cors");

connectMongo();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.json());
app.use("/user", require("./routes/users"));

app.listen(4000, () => {
  console.log("Started Listening at 4000");
});
