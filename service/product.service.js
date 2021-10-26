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
}
module.exports= new ProductService()