const express = require("express");
const router = express.Router();
const item = require("../models/items");

router.get("/menu", async (req, res) => {
  try {
    const items = await item.find();

    res.send([items, global.categ]);
  } catch (e) {
    res.send("Something Went Wrong!! Unable to load menu Items");
  }
});

router.post("/menu", async (req, res) => {
  try {
    const items = await item.find();

    res.send([items, global.categ]);
  } catch (e) {
    res.send("Something Went Wrong!! Unable to load menu Items");
  }
});

router.get("/add-to-cart/:id/:quant/:price", async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push([req.params.id, req.params.quant, req.params.price]);
  res.cookie("cart", cart);

  // return res.send(req.cookies);
  return res.redirect("/menu");
});

router.get("/add-to-cart/delete/:id", (req, res) => {
  let cart = req.cookies.cart;

  const id = parseInt(req.params.id);

  if (
    cart &&
    Array.isArray(cart) &&
    !isNaN(id) &&
    id >= 0 &&
    id < cart.length
  ) {
    cart.splice(id, 1);
    console.log(cart);
    res.cookie("cart", cart);
    return res.redirect("/cart");
  } else {
    return res.status(400).send("Invalid request");
  }
});

// router.get("/", (req, res) => {
//   res.send("This is the items list");
// });

// router.get("/new", (req, res) => {
//   res.send("This is the new item");
// });

// router.post("/", (req, res) => {
//   res.send("Create new item");
// });

// router
//   .route("/:id")
//   .get((req, res) => {
//     id = req.params.id;
//     res.send(
//       `Getting item with id ${req.params.id} \n The item is : ${res.item}`
//     );
//   })
//   .put((req, res) => {
//     id = req.params.id;
//     res.send(`Updating item with id ${req.params.id}`);
//   })
//   .delete((req, res) => {
//     id = req.params.id;
//     res.send(`Deleting item with id ${req.params.id}`);
//   });

// const itemsList = ["burger", "fries", "fried chicken", "pizza"];

// router.param("id", (req, res, next, id) => {
//   if (itemsList[id] === undefined) {
//     res.item = "There is no item with this id";
//   } else {
//     res.item = itemsList[id];
//   }
//   next();
// });
// // router.get("/:id",(req,res)=>{
// //     id=req.params.id
// //     res.send(`Getting user with id ${req.params.id}`)
// // })

// // router.put("/:id",(req,res)=>{
// //     id=req.params.id
// //     res.send(`Updating user with id ${req.params.id}`)
// // })

// // router.delete("/:id",(req,res)=>{
// //     id=req.params.id
// //     res.send(`Deleting user with id ${req.params.id}`)
// // })

module.exports = router;
