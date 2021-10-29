/*************************************************************************
 * @purpose         :This file belong to database schema and logical operation
 *                   for data update remove find etc
 * @file            :Product.model.js
 * @author          :Ganesh
 *************************************************************************/
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Registration",
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now()
  },
});

const Product = mongoose.model("Product", productSchema);
class Model {
  /**
   * @description this function is for crete note collection and save it in DB
   * @param {*} info  should be for note creation in DB
   * @returns saved data or if error returns error
   */
  createProduct = (product, callback) => {
    console.log(product);

    const createProduct = new Product({
      adminId: product.userId,
      name: product.name,
      author: product.author,
      category: product.category,
      description: product.description,
      price: product.price,
    });
    createProduct.save((error, product) => {
      if (error) {
        return callback(error, null);
      } else {
        console.log(product);
        return callback(null, product);
      }
    });
  };
  deleteBook = async (bookId) => {
    return await Product.findOneAndDelete({ _id: bookId });
  };

  getAllBook = async () => {
    return await Product.find().sort({ date: -1 });
  };
  updateBook = async (booktoUpdate) => {
    return await Product.findByIdAndUpdate(booktoUpdate.Id, {
      name: booktoUpdate.name,
      author: booktoUpdate.author,
      category: booktoUpdate.category,
      price: booktoUpdate.price,
      description: booktoUpdate.description,
    },{new: true});
  };
  getBookById = async(bookId)=>{
    return await Product.findById(bookId).sort({ date: -1 });

  }
}
module.exports = new Model();
