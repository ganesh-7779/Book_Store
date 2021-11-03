const cartModel = require("../models/addToCart.model");
class cartService {
  addToCartSer = async (userId,itemId,quantity) => {
    const checkToCart = await cartModel.addTocart(userId,itemId,quantity);
    return checkToCart
  };
  removeToCart = async(userId, bookId) => {
    const data = await cartModel.removeFromcart(userId,bookId);
    return data
  }
  viewCartItem = async(userId)=> {
    const data = await cartModel.viewCartItem(userId);
    return data
  }
}
module.exports = new cartService();
