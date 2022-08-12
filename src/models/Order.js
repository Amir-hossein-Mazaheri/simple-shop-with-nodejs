import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Product = model("Order", orderSchema);

export default Product;
