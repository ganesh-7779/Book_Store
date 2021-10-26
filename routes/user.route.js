/*******************************************************************
 * @description   : For Routing the APIs
 * @author        : Ganesh
********************************************************************/
const userController = require("../controllers/user.controller");
module.exports = (app) => {  
    // Create a new registration
    app.post("/admin-register", userController.registration);
    app.post("/user-register", userController.userRegistration);

    app.post("/login", userController.userlogin);

}