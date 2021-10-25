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
  registration = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };
      const isUserValidate = validation.validateSchema.validate(user);
      if (isUserValidate.error) {
        //console.log(isUserValidate.error);
        res.status(422).send({
          success: false,
          message: "Wrong user input",
          data: isUserValidate
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
            message: "User Registered successfully",
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
}
module.exports = new UserController();
