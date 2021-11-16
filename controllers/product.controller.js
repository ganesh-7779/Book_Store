/**
 * @module:         controllers
 * @file:           product.controller.js
 * @description:    Taking the request from the client and gives the response.
 * @author:         Ganesh Gavhad
 */
const productService = require("../service/product.service");
const redis = require("redis");
const client = redis.createClient();
const setRedis = require("../helper/redis");
const logger = require("../logger/logger");

class Product {
  /**
   * @description:    Create and save book and sending response to service
   * @method:         creates the book for the user
   * @param:          req,res for service
   */
  createProduct = (req, res) => {
    try {
      const product = {
        userId: req.user.dataForToken.id,
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        category: req.body.category,
        price: req.body.price,
      };
      // console.log(product)
      productService.createProduct(product, (err, product) => {
        if (err) {
          logger.error(err);
          return res.status(401).json({
            message: "failed to create book",
            success: false,
          });
        } else {
          logger.info("Successfully inserted Product");
          return res.status(201).send({
            message: "Successfully inserted Product",
            success: true,
            data: product,
          });
        }
      });
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };
  /**
   * @description:    Deletes book by id
   * @method:         deleteBook
   * @param:          req,res for service
   */
  deleteBook = async (req, res) => {
    try {
      const bookId = req.params.Id;
      //console.log(bookId);
      const data = await productService.deleteBook(bookId);
      if (!data) {
        logger.info("Book Not Found");
        return res.status(404).json({
          message: "Book Not Found",
          success: false,
        });
      } else {
        logger.info("Book Deleted succesfully");
        return res.status(200).json({
          message: "Book Deleted succesfully",
          success: true,
        });
      }
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };
  /**
   * @description:    Fetches all the books
   * @method:         getBooks
   * @param:          req,res for service
   */
  getAllBook = async (req, res) => {
    try {
      const data = await productService.getAllBook();
      if (!data) {
        logger.info("Book Not Found");
        return res.status(404).json({
          message: "Book Not Found",
          success: false,
        });
      } else {
        //client.setex("getAllBook", 60, JSON.stringify(data));
        return res.status(200).json({
          message: "Its Your All Book",
          success: true,
          data: data,
        });
      }
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };
  /**
   * @description:    Sort all the books by low to high price
   * @method:         getBooks with low lo high price
   * @param:          req,res for service
   */
  lowTOHighPrice = async (req, res) => {
    try {
      const data = await productService.lowTOHighPrice();
      if (!data) {
        logger.info("Book Not Found");
        return res.status(404).json({
          message: "Book Not Found",
          success: false,
        });
      } else {
        // client.setex("getAllBook", 60, JSON.stringify(data));
        return res.status(200).json({
          message: "Its Your All Book With Low To High Price",
          success: true,
          data: data,
        });
      }
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };
  /**
   * @description:    Sort all the books by high to low price
   * @method:         getBooks with high lo low price
   * @param:          req,res for service
   */
  highToLowPrice = async (req, res) => {
    try {
      const data = await productService.highToLowPrice();
      if (!data) {
        logger.info("Book Not Found");
        return res.status(404).json({
          message: "Book Not Found",
          success: false,
        });
      } else {
        // client.setex("getAllBook", 60, JSON.stringify(data));
        return res.status(200).json({
          message: "Its Your All Book With High To Low Price",
          success: true,
          data: data,
        });
      }
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };
  /**
   * @description:    Sort all the books by min and max price limit
   * @method:         getBooks within minimum and maximum price limit
   * @param:          req,res for service
   */
  minAndMaxPrice = async (req, res) => {
    try {
      const price = { min: req.body.min, max: req.body.max };
      console.log(req.body);
      const data = await productService.minAndMaxPrice(price);
      if (!data) {
        logger.info("Book Not Found");
        return res.status(404).json({
          message: "Book Not Found",
          success: false,
        });
      } else {
        // client.setex("getAllBook", 60, JSON.stringify(data));
        return res.status(200).json({
          message: "Its Your All Book Within Price Limit",
          success: true,
          data: data,
        });
      }
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };
  /**
   * @description:    Updates the book given by the Admin
   * @method:         updates the book
   * @param:          req,res for service
   */
  updateBook = async (req, res) => {
    try {
      const booktoUpdate = {
        Id: req.params.Id,
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        category: req.body.category,
        price: req.body.price,
      };
      const data = await productService.updateBook(booktoUpdate);
      if (data) {
        //setRedis.clearCache();
        return res.status(200).json({
          message: "Book Updated Successfully",
          success: true,
          data: data,
        });
      } else {
        logger.info("Book Not Found");
        return res.status(404).json({
          message: "Book Not Found",
          success: false,
        });
      }
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };
  /**
   * @description:    Fetches book by Id
   * @method:         getBookByID
   * @param:          req,res for service
   */
  getBookById = async (req, res) => {
    try {
      const bookId = req.params.Id;
      const data = await productService.getBookById(bookId);
      if (!data) {
        logger.info("Book Not Found");
        return res.status(404).json({
          message: "Book Not Found",
          success: false,
        });
      } else {
        client.setex(bookId, 60, JSON.stringify(data));
        return res.status(200).json({
          message: "Its Your Book",
          success: true,
          data: data,
        });
      }
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };
  // Search book by using name or category
  searchBook = async (req, res) => {
    try {
      const textToSerch = req.body.nameNcategory;
      console.log(textToSerch);
      const data = await productService.searchBook(textToSerch);
      if (!data && data == null) {
        logger.info("Book Not Found");
        return res.status(404).json({
          message: "Book Not Found with this name or category",
          success: false,
        });
      } else {
        return res.status(200).json({
          message: "Its Your Book",
          success: true,
          data: data,
        });
      }
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };
}
module.exports = new Product();
