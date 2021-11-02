const cartModel = require("../models/addToCart.model");
class cartService {
  // addToCart = async (bookId, userId) => {

  //   const checkToCart = await cartModel.addTocart(bookId, userId);
  //   console.log(checkToCart + "cart service from modole");
  //   if (checkToCart == null) {
  //     return false;
  //   } else {
  //     for (let i = 0; i < checkToCart.bookId.length; i++) {
  //       if (JSON.stringify(checkToCart.bookId[i]) === JSON.stringify(bookId)) {
  //         return true;
  //       }
  //     }
  //   }
  //   return await cartModel.addItemTocart(bookId, userId);
  // };
  addToCartSer = async (userId,itemId,quantity) => {
    const checkToCart = await cartModel.addTocart(userId,itemId,quantity);
    return checkToCart
  };
}
module.exports = new cartService();
