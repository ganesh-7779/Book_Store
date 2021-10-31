const mongoose = require("mongoose");

const addtocart = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Registration",
  },
  bookId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
  },
  addedDate: {
    type: Date,
    default: Date.now(),
  },
});

const cart = mongoose.model("cart", addtocart);
class CartModel {
  addTocart = async (bookId, userId)=> {
    const addToCartData = await cart.findOne({userId: userId})
    if (addToCartData !== null) {
      
      return addToCartData;
    } else {
      const addToCartData = new cart({
        userId: userId,
        bookId: bookId
    });
    const datauser = async () => {
      await addToCartData.save();
    };
    datauser();
    return null
   // return addToCartData 
   }
}
addItemTocart = async (bookId,userId)=> {
  const data = await cart.findOneAndUpdate( { userId: userId},{ $push: { bookId: bookId } },
    { new: true }
  );
  return data
}
}
module.exports= new CartModel