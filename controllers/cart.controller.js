const cartService = require("../service/cart.service");
const bookModel = require("../models/product.model");
const product = require("../models/product.model");
const cartModel = require("../models/addToCart.model");
const logger = require("../logger/logger");
class CartController {

  addToCart = async (req, res) => {
    //const { userId, itemId } = req.body;
    const userId = req.user.dataForToken.id
    const bookId = req.params.Id
    const quantity = Number.parseInt(req.body.quantity);
    let cart = await cartService.addToCartSer(userId, bookId, quantity);
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
    //const { userId, bookId } = req.body;
    const userId = req.user.dataForToken.id
    const bookId = req.params.Id
    let cart = await cartService.removeToCart(userId, bookId);
    if (cart) {
      logger.info("Remove From Cart successfully");
      res.status(200).send({
        message: "Book Removed successfully, Now Available Book In Cart!",
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
  viewCartItem= async(req,res)=> {
    const userId = req.user.dataForToken.id
    let cartItem = await cartService.viewCartItem(userId);
    if(cartItem){
      res.status(200).send({
        message: "Its your Cart Item",
        data: cartItem,
        success: true,
      });
    }else{
      res.status(404).send({
        message: "Cart Not Found",
        data: cartItem,
        success: false
      });
    }
  }
  buyBookFromCart = async(req,res)=> {
    const buyBook = {
      isPurchase: req.body.isPurchese,
      bookId: req.params.Id,
      userId: req.user.dataForToken.id
    }
    let isPurchase = await cartService.buyBookFromCart(buyBook);
    if(isPurchase){
      res.status(200).send({
        message: "Book Purchase successfully",
        data: isPurchase,
        success: true,
      });
    }else if(isPurchase == null){
      res.status(404).send({
        message: "Book Not Found",
        data: isPurchase,
        success: false
      });
    }
    else{
      res.status(404).send({
        message: "Cart Not Found",
        data: isPurchase,
        success: false
      });
    }
  }
}
module.exports = new CartController();
