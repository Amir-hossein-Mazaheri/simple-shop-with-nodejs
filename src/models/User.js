import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user", // other option is superuser
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const copyCartItems = [...this.cart.items];

  const productIndex = copyCartItems.findIndex(
    (cp) => cp.productId.toString() === product._id.toString()
  );

  if (productIndex > -1) {
    copyCartItems[productIndex].quantity++;
  } else {
    copyCartItems.push({
      productId: product._id,
      quantity: 1,
    });
  }

  this.cart.items = copyCartItems;
  return this.save();
};

userSchema.methods.removeFromCart = function (product) {
  let copyCartItems = [...this.cart.items];
  const productIndex = copyCartItems.findIndex(
    (cp) => cp.productId.toString() === product._id.toString()
  );

  if (productIndex === -1) return;

  if (copyCartItems[productIndex].quantity > 1) {
    copyCartItems[productIndex].quantity--;
  } else {
    copyCartItems = copyCartItems.filter((_, index) => index !== productIndex);
  }

  this.cart.items = copyCartItems;

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};

const User = model("User", userSchema);

export default User;
