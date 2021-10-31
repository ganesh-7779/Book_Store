const cartService = require("../service/cart.service");
const bookModel = require("../models/product.model");
class CartController {
  addToCart = async (req, res) => {
    const userId = req.user.dataForToken.id,
      bookId = req.params.Id;
    console.log(userId, bookId);

    const checkBook = await bookModel.getBookById(bookId);
    if (!checkBook) {
      return res.status(404).json({
        message: "Book Already Sold Out",
        success: false,
      });
    } else {
      const isExist = await cartService.addToCart(bookId, userId);
      console.log(isExist)
      if (isExist) {
        return res.status(201).json({
          message: "Book Already Added To Cart",
          success: false,
        });
      } else {
        return res.status(201).json({
          message: "Book SuccessFully Added To Cart",
          success: true,
          data: isExist,
        });
      }
    }
  };
}
module.exports = new CartController();
