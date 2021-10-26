const productService = require("../service/product.service");
class Product {
createProduct = (req, res) => {
    try {
      const product = {
        userId: req.user.dataForToken.id,
        name: req.body.name,
        description: req.body.description,
        author:req.body.author,
        category: req.body.category,
        price: req.body.price
      };
   // console.log(product)
      productService.createProduct(product, (err, product) => {
        if (err) {
          return res.status(401).json({
            message: "failed to post Product",
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
}
module.exports= new Product()