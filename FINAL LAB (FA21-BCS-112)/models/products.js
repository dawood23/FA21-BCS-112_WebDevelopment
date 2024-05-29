const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

module.exports = product;
