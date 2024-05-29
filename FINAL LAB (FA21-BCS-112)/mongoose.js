const mongoose = require("mongoose");
const URL =
  "mongodb+srv://dawood:03348757377d@cluster0.nlusybm.mongodb.net/foodapp";

const connectMongo = async () => {
  await mongoose.connect(URL);
  console.log("Connected");
  const foodItems = mongoose.connection.collection("items");
  try {
    const data = await foodItems.find({}).toArray();
    global.items = data;
  } catch (error) {
    console.error(error);
  }
  const foodCategory = mongoose.connection.collection("itemsCategory");
  try {
    const categ = await foodCategory.find({}).toArray();
    global.categ = categ;
  } catch (e) {
    console.log(e);
  }
};
module.exports = connectMongo;
