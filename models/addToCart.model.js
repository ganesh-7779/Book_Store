// const mongoose = require("mongoose");

// const addtocart = mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "Registration",
//   },
//   bookId: {
//     type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//   },
//   addedDate: {
//     type: Date,
//     default: Date.now(),
//   },
// });

// const cart = mongoose.model("cart", addtocart);
// class CartModel {
//   addTocart = async (bookId, userId) => {
//     const addToCartData = await cart.findOne({ userId: userId });
//     if (addToCartData !== null) {
//       return addToCartData;
//     } else {
//       const addToCartData = new cart({
//         userId: userId,
//         bookId: bookId,
//       });
//       const datauser = async () => {
//         await addToCartData.save();
//       };
//       datauser();
//       return null;
//       // return addToCartData
//     }
//   };
//   addItemTocart = async (bookId, userId) => {
//     const data = await cart.findOneAndUpdate(
//       { userId: userId },
//       { $push: { bookId: bookId } },
//       { new: true }
//     );
//     return data;
//   };
// }
// module.exports = new CartModel();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      // min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//module.exports = mongoose.model("item", ItemSchema);
const item = mongoose.model("item", ItemSchema);

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
    },

    items: [ItemSchema],

    subTotal: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("cart", CartSchema);

//module.exports = mongoose.model("cart", CartSchema);
const product = require("../models/product.model");

class cartModel {
  addTocart = async (userId, itemId, quantity) => {
    const cartdata = await Cart.findOne({ userId: userId });
    const productDetails = await product.getBookById(itemId); //findById(itemId);

    //return cartdata
    if (cartdata) {
      let indexFound = cartdata.items.findIndex((p) => p.productId == itemId);
      console.log("Index", indexFound);
      //check if product exist,just add the previous quantity with the new quantity and update the total price
      if (indexFound != -1) {
        const qnt = (cartdata.items[indexFound].quantity =cartdata.items[indexFound].quantity + quantity);
        cartdata.items[indexFound].total =cartdata.items[indexFound].quantity * productDetails.price;
        cartdata.items[indexFound].price = productDetails.price;
        cartdata.subTotal = cartdata.items
          .map((item) => item.total)
          .reduce((acc, curr) => acc + curr);
        if (qnt <= 0) {
          cartdata.items.pop(indexFound);

          if (cartdata.items.length < 0) {
            for (let i = 0; i < cartdata.items.length; i++) {
              cartdata.subTotal += cartdata.items.total[i];
            }
          } else {
            cartdata.subTotal = cartdata.items.total;
          }
        }
      }
      //Check if Quantity is Greater than 0 then add item to items Array
      else if (quantity > 0) {
        cartdata.items.push({
          productId: itemId,
          quantity: quantity,
          price: productDetails.price,
          total: parseInt(productDetails.price * quantity).toFixed(2),
        });
        cartdata.subTotal = cartdata.items
          .map((item) => item.total)
          .reduce((acc, curr) => acc + curr);
      }
      //if quantity is less than 0
      else {
        return null;
      }
      const data = await cartdata.save();
      return data;
    } else if (quantity < 0) {
      return null;
    }
    //if there is no user with a cart then it creates a new cart and then adds the item to the cart that has been created
    else {
      const cartData = {
        userId: userId,
        items: [
          {
            productId: itemId,
            quantity: quantity,
            total: parseInt(productDetails.price * quantity),
            price: productDetails.price,
          },
        ],
        subTotal: parseInt(productDetails.price * quantity),
      };
      let cart = new Cart(cartData);
      let data = await cart.save();
      return data;
    }
  };
}

module.exports = new cartModel();
