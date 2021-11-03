
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

const product = require("../models/product.model");

class cartModel {
  addTocart = async (userId, itemId, quantity) => {
    const cartdata = await Cart.findOne({ userId: userId });
    const productDetails = await product.getBookById(itemId); 

    if (cartdata) {
      let indexFound = cartdata.items.findIndex((p) => p.productId == itemId);
      console.log("Index", indexFound);
      //check if product exist,just add the previous quantity with the new quantity and update the total price
      if (indexFound != -1) {
        const qnt = (cartdata.items[indexFound].quantity =
        cartdata.items[indexFound].quantity + quantity);
        console.log(qnt);
        cartdata.items[indexFound].total =
        cartdata.items[indexFound].quantity * productDetails.price;
        cartdata.items[indexFound].price = productDetails.price;
        cartdata.subTotal = cartdata.items
          .map((item) => item.total)
          .reduce((acc, curr) => acc + curr);
        if (qnt <= 0) {
          await cartdata.items.splice(indexFound, 1);
          const cartdata2 = await cartdata.save();
          if (cartdata2.items.length < 0) {
            for (let i = 0; i < cartdata2.items.length; i++) {
              cartdata2.subTotal += cartdata2.items.total[i];
            }
          } else {
            cartdata2.subTotal = cartdata2.items.total;
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
  removeFromcart = async (userId, bookId) => {
    const cartdata = await Cart.findOne({ userId: userId });
    if (cartdata) {
      let indexFound = cartdata.items.findIndex((p) => p.productId == bookId);
      if (indexFound != -1) {
        await cartdata.items.splice(indexFound, 1);
        const cartData2 = await cartdata.save();
        if (cartData2.items.length > 0) {
          cartData2.subTotal = cartData2.items
            .map((item) => item.total)
            .reduce((acc, curr) => acc + curr);
          await cartData2.save();
          return cartData2;
        } else if (cartData2.items.length == 0) {
          cartData2.subTotal = cartData2.items.total;
          await cartData2.save();
          return cartData2;
        }
      } else {
        return null;
      }
    } else {
      return false;
    }
  };
  viewCartItem = async(userId)=> {
    const cartdata = await Cart.findOne({ userId: userId },{_id:0,userId:0,createdAt:0,updatedAt:0,__v:0})
     console.log(cartdata)
    return cartdata
  }
}
module.exports = new cartModel();
