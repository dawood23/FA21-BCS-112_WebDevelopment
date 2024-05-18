const express = require("express");
const router = express.Router();

router.get("/menu", (req, res) => {
  try {
    res.send([global.items, global.categ]);
  } catch (e) {
    res.send("Something Went Wrong!! Unable to load menu Items");
  }
});

router.post("/menu", (req, res) => {
  try {
    res.send([global.items, global.categ]);
  } catch (e) {
    res.send("Something Went Wrong!! Unable to load meu Items");
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
