const productService = require("../service/product.service");
class Product {
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
          return res.status(401).json({
            message: err.message,
            success: false,
          });
        } else {
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

  deleteBook = async (req, res) => {
    try {
      const bookId = req.params.Id;
      //console.log(bookId);
      const data = await productService.deleteBook(bookId);
      if (!data) {
        return res.status(404).json({
          message: "Book Not Found",
          success: false,
        });
      } else {
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
  getAllBook = async (req, res) => {
    try {
      const data = await productService.getAllBook();
      if (!data) {
        return res.status(404).json({
          message: "Book Not Found",
          success: false,
        });
      } else {
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
  updateBook = async (req, res) => {
    try {
      const booktoUpdate ={
        Id: req.params.Id,
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        category: req.body.category,
        price: req.body.price,
      }
      const data = await productService.updateBook(booktoUpdate);
      if (!data) {
        return res.status(404).json({
          message: "Book Not Found",
          success: false,
        });
      } else {
        return res.status(201).json({
          message: "Book Updated Successfully",
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
  getBookById = async (req, res) => {
    try {
      const bookId = req.params.Id
      const data = await productService.getBookById(bookId);
      if (!data) {
        return res.status(404).json({
          message: "Book Not Found",
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
  // Search book by using name or category
  searchBook = async(req,res)=>{
    try{
    const textToSerch = req.body.nameNcategory
    console.log(textToSerch)
    const data = await productService.searchBook(textToSerch);
      if (!data) {
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
  }
}
module.exports = new Product();
