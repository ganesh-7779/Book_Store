/***********************************************************************************
 * @module       userService
 * @file         user.service.js
 * @description  UserService class for invoking  the callback method for controller
 * @author       Ganesh Gavhad
 * @since        16/11/2021
 *************************************************************************************/
const userModel = require("../models/registration.model");
const bcrypt = require("bcrypt");
const helper = require("../helper/user.helper");


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

  /**
   * @description sends the data to loginApi in the controller
   * @method userLogin to login user and make pass into hash form
   * @param callback for controller
   */
   userLogin = (InfoLogin, callback) => {
    userModel.loginModel(InfoLogin, (error, data) => {
      if (data) {
        // validate will take boolean value true and false
        bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
          if (!validate) {
            return callback(error + "Invalid Password", null);
          } else {
            console.log(data + "service data for token");
            const token = helper.generateToken(data);
            console.log(token + "service");
            return callback(null, token);
          }
        });
      } else {
        return callback(error);
      }
    });
  };
}
module.exports = new UserService();
