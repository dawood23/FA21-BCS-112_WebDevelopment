const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    options: [
      {
        type: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const item = mongoose.model("item", menuSchema);

module.exports = item;
