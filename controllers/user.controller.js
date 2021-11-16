/**
 * @module:         controller
 * @file:           user.controller.js
 * @description:    Taking the request from the client and gives the response.
 * @author:         Ganesh Gavhad
 */

const userService = require("../service/user.service");
const validation = require("../helper/validation");

/**
 * @description   : Controller class is use for taking HTTP request from the client or users and gives the response to client through DB
 * @author        : Ganesh
 */
class UserController {
  /**
   * @description Create and save user and sending response to service
   * @method registration to save the user into database
   * @param req,res for service
   */
  registration = (req, role, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: role,
      };
      const isUserValidate = validation.validateSchema.validate(user);
      if (isUserValidate.error) {
        //console.log(isUserValidate.error);
        res.status(422).send({
          success: false,
          message: "Wrong user input",
          data: isUserValidate,
        });
      }

      // console.log(user)
      userService.registerUser(user, (error, data) => {
        if (error) {
          return res.status(409).json({
            success: false,
            message: "user/email already exist or please enter valid details",
          });
        } else {
          return res.status(201).json({
            success: true,
            message: "Registration completed successfully",
            data: data,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while registering",
        data: null,
      });
    }
  };
  /**
   * @description:    retrieving login info from user by email and password
   * @method:         userlogin
   * @param:          req,res for service
   */
  userlogin = (req, res) => {
    try {
      const userLoginInfo = {
        email: req.body.email,
        password: req.body.password,
      };

      const loginValidation = validation.loginSchema.validate(userLoginInfo);
      if (loginValidation.error) {
        //logger.error(loginValidation.error);
        res.status(422).send({
          success: false,
          message: loginValidation.error.message,
        });
      }
      userService.userLogin(userLoginInfo, (error, token) => {
        if (error) {
          return res.status(401).json({
            success: false,
            message: "Unable to login. Please enter correct info",
            error,
          });
        }
        return res.status(201).json({
          success: true,
          message: "User logged in successfully",
          token: token,
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while Login",
        data: null,
      });
    }
  };
}
module.exports = new UserController();
