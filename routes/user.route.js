/*******************************************************************
 * @description   : For Routing the APIs
 * @author        : Ganesh
********************************************************************/
const {registration, userlogin}= require("../controllers/user.controller");
const {createProduct,getAllBook,deleteBook,updateBook,getBookById, searchBook,lowTOHighPrice} = require("../controllers/product.controller")
const{addToCart,removeFromCart,viewCartItem,buyBookFromCart} =require("../controllers/cart.controller")
const {adminProtected,auth} = require("../helper/user.helper");
const{redis, redisById} = require("../helper/redis")

module.exports = (app) => {  
    // Create a new registration
    app.post("/admin-register", async (req,res)=>{
         await registration(req, "Admin", res);
    });
    app.post("/user-register", async (req,res)=>{
        await registration(req, "User", res);
   });
    app.post("/login",userlogin);

    // admin Protected 
    app.post("/createBook", auth, adminProtected, createProduct);
    app.delete("/deleteBook/:Id", auth, adminProtected, deleteBook);
    app.put("/updateBook/:Id", auth, adminProtected, redis, updateBook);
    //public 
    app.get("/getAllBook", auth,redis,getAllBook);
    app.get("/getBookBy/:Id", auth,redisById,getBookById);
    //Search book in lab by using name or category
    app.post("/searchBook",auth,searchBook)
    app.get("/lowTOHighPrice",auth,lowTOHighPrice)
   // add to cart
   //app.post("/addToCart/:Id", auth,addToCart)
   app.post("/addToCart/:Id", auth,addToCart)
   app.delete("/removeFromCart/:Id", auth, removeFromCart)
   app.get("/viewCartItem", auth, viewCartItem)
   app.put("/buyBookFromCart/:Id",auth,buyBookFromCart)
   

}