/*******************************************************************
 * @description   : For Routing the APIs
 * @author        : Ganesh
********************************************************************/
const {registration, userlogin}= require("../controllers/user.controller");
const {createProduct,getAllBook,deleteBook,updateBook,getBookById} = require("../controllers/product.controller")
const {adminProtected,auth} = require("../helper/user.helper");

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
    app.put("/updateBook/:Id", auth, adminProtected, updateBook);
    //public 
    app.get("/getAllBook", auth,getAllBook);
    app.get("/getBookBy/:Id", auth,getBookById);


}