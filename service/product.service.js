const productModel = require("../models/product.model");
class ProductService {
    /*
   * @description : this function is written to send data models
   * @param       : A valid notes data is expected from service
   * @returns     : if note get reated in DB return data else error
   */
  createProduct = (product, callback) => {
    productModel.createProduct(product, (err, product) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, product);
      }
    });
  };
  deleteBook = async (bookId)=>{
    return await productModel.deleteBook(bookId)
  }
  getAllBook = async () => {
    return await productModel.getAllBook()
  }
  updateBook = async (booktoUpdate)=>{
    return await productModel.updateBook(booktoUpdate)
  }
  getBookById = async(bookId)=>{
    return await productModel.getBookById(bookId)
  }
  searchBook = async(textToSerch) => {
    return await productModel.searchBook(textToSerch) 
  }
}
module.exports= new ProductService()