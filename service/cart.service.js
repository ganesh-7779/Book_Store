const cartModel = require("../models/addToCart.model");
class cartService {
  addToCart = async (bookId, userId) => {
    const checkToCart = await cartModel.addTocart(bookId, userId);
    console.log(checkToCart + "cart service from modole");
    if (checkToCart == null) {
      return false;
    } else {
        console.log(JSON.stringify(checkToCart.bookId[0]))
      for (let index = 0; index <= checkToCart.bookId.length; index++) {
        if (
          JSON.stringify(checkToCart.bookId[index]) === JSON.stringify(bookId)
        ) {
          return true;
        } else {
          const addItemTocart = await cartModel.addItemTocart(bookId, userId);
          return addItemTocart;
        }
      }
    }
  };
}
module.exports = new cartService();
