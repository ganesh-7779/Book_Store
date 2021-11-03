const cartService = require("../service/cart.service");
const bookModel = require("../models/product.model");
const product = require("../models/product.model");
const cartModel = require("../models/addToCart.model");
const logger = require("../logger/logger");
class CartController {

  addToCart = async (req, res) => {
    const { userId, itemId } = req.body;
    const quantity = Number.parseInt(req.body.quantity);
    let cart = await cartService.addToCartSer(userId, itemId, quantity);
    if (cart) {
      logger.info("Add to Cart successfully");
      res.status(200).send({
        message: "Add to Cart successfully!",
        data: cart,
      });
    } else {
      logger.info("Invalid request,Please enter valid quantity");
      return res.status(400).json({
        message: "Invalid request,Please enter valid quantity",
      });
    }
  };
  removeFromCart = async (req, res) => {
    const { userId, bookId } = req.body;
    let cart = await cartService.removeToCart(userId, bookId);
    if (cart) {
      logger.info("Remove From Cart successfully");
      res.status(200).send({
        message: "Remove From  Cart successfully!",
        data: cart,
        success: true,

      });
    } else if(cart == false){
      res.status(404).send({
        message: "Cart Not Found",
        success: false
      });
    }
    else{
      res.status(404).send({
        message: "Book Not Found",
        data: cart,
        success: false
      });
    }
  };
}
module.exports = new CartController();
