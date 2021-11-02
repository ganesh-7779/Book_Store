const cartService = require("../service/cart.service");
const bookModel = require("../models/product.model");
const product = require("../models/product.model");
const cartModel = require("../models/addToCart.model")
class CartController {
  // addToCart = async (req, res) => {
  //   const userId = req.user.dataForToken.id,
  //     bookId = req.params.Id;
  //   console.log(userId, bookId);

  //   const checkBook = await bookModel.getBookById(bookId);
  //   if (!checkBook) {
  //     return res.status(404).json({
  //       message: "Book Already Sold Out",
  //       success: false,
  //     });
  //   } else {
  //     const isExist = await cartService.addToCart(bookId, userId);
  //     console.log(isExist);
  //     if (isExist === true) {
  //       return res.status(201).json({
  //         message: "Book Already Added To Cart",
  //         success: false,
  //       });
  //     } else if (isExist === false) {
  //       return res.status(201).json({
  //         message: "Book SuccessFully Added To Cart",
  //         success: true,
  //         data: isExist,
  //       });
  //     } else {
  //       return res.status(201).json({
  //         message: "Book SuccessFully Added To Cart",
  //         success: true,
  //         data: isExist,
  //       });
  //     }
  //   }
  // };
  addToCart = async (req, res) => {
    const { userId, itemId } = req.body;
    let data = null;
    const quantity = Number.parseInt(req.body.quantity);
    //const productDetails = await product.getBookById(itemId)//findById(itemId);
    let cart = await cartService.addToCartSer(userId,itemId,quantity);
    //let cart = await cartModel.addTocart(userId,itemId,quantity);

    //await Cart.findOne({ userId: userId});
    if (cart) {
      res.status(200).send({
        message: "Add to Cart successfully!",
        data: cart,
      });
    }
    return res.status(400).json({
      message: "Invalid request",
    });
  };
}
module.exports = new CartController();
