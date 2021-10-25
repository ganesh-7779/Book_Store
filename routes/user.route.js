/*******************************************************************
 * @description   : For Routing the APIs
 * @author        : Ganesh
********************************************************************/
const userController = require("../controllers/user.controller");
module.exports = (app) => {  
    // Create a new registration
    app.post("/register", userController.registration);
}