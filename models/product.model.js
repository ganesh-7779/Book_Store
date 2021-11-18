/************************************************************************
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
   * @description this function is for crete Book collection and save it in DB
   * @param {*} product should contain book details for creation in DB
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
  /**
   * @description deleteBook this function is for delete Book from DB and save reamaining data  DB
   * @param {*} bookId it is a book id to delete book from  DB
   * @returns saved data or if error returns error
   */
  deleteBook = async (bookId) => {
    return await Product.findOneAndDelete({ _id: bookId });
  };
 /**
   * @description getAllBook this function is for fatch all Book from DB
   * @param {*} bookId it is a book id to delete book from  DB
   * @returns  data or null
   */
  getAllBook = async () => {
    return await Product.find({},{_id:0,date:0,adminId:0,__v:0})
  };
  /**
   * @description updateBook this function is for update Book from DB
   * @param {*} booktoUpdate it has cantain book id and book details to update book from  DB
   * @returns  data or null
   */
  updateBook = async (booktoUpdate) => {
    return await Product.findByIdAndUpdate(booktoUpdate.Id, {
      name: booktoUpdate.name,
      author: booktoUpdate.author,
      category: booktoUpdate.category,
      price: booktoUpdate.price,
      description: booktoUpdate.description,
    },{new: true});
  };
  /**
   * @description getBookById this function is for fatch Book from DB using book id
   * @param {*} bookId it has cantain book id 
   * @returns  data or null
   */
  getBookById = async(bookId)=>{
    const data = await Product.findById(bookId).sort({ date: -1 });
    //console.log(data)
    return data
  }
 /**
   * @description searchBook this function is for search Book from DB using using book category or book name
   * @param {*} textToSerch it has cantain book name and book category
   * @returns  data or null
   */
  searchBook = async(textToSerch) => {
    console.log(textToSerch)
    const data = await Product.find({$or:[{name:{$regex :textToSerch, $options: 'i' }},{category:{$regex:textToSerch , $options: 'i'}}]});
   //console.log(data)
   return data
  }
  /**
   * @description lowTOHighPrice this function is for sort Book by low to high price range sequence from DB using using find method
   * @returns  data or null
   */
  lowTOHighPrice = async()=> {
    return await Product.find({},{_id:0,date:0,adminId:0,__v:0}).sort({ price: 1 })
  }
  /**
   * @description HighToLowPrice this function is for sort Book by high to low price range sequence from DB using using find method
   * @returns  data or null
   */
  highToLowPrice = async()=> {
    return await Product.find({},{_id:0,date:0,adminId:0,__v:0}).sort({ price: -1 })
  }
  /**
   * @description minAndMaxPrice this function is for sort Book by minimum price and maximum price range book from DB using using find minimum and maximum price
   * @returns  data or null
   */
  minAndMaxPrice= async(price)=> {
    console.log(price.max)
    console.log(price.min)
    const data = await Product.find({price: {$gt: price.min, $lt: price.max}},{_id:0,date:0,adminId:0,__v:0})
    console.log(data)
    return data;
  }
}
module.exports = new Model();
