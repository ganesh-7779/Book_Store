/***********************************************************************************
 * @module       userService
 * @file         user.service.js
 * @description  UserService class for invoking  the callback method for controller
 * @author       Ganesh Gavhad
 * @since        17/09/2021
 *************************************************************************************/
const userModel = require("../models/registration.model");
class UserService {
  /**
   * @description Create and save user ,then send response to controller
   * @method registerUser to save the user
   * @param callback callback for controller
   **/
  registerUser = (user, callback) => {
    userModel.registerUser(user, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
         // console.log(data+ "service return")
        return callback(null, data);
      }
    });
  };
}
module.exports = new UserService();
