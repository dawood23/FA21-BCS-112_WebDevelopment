const mongoose = require("mongoose");
const URL =
  "mongodb+srv://dawood:03348757377d@cluster0.nlusybm.mongodb.net/foodapp";

const connectMongo = async () => {
  await mongoose.connect(URL);
  console.log("Connected");
  const foodItems = mongoose.connection.collection("items");
  try {
    const data = await foodItems.find({}).toArray();
    console.log();
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectMongo;
