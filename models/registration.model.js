/***********************************************************************************
 * @module       Registration Model
 * @file         Registration.model.js
 * @description  Registration.model is for collection structure of database and fuction regarding DB
 * @author       Ganesh Gavhad
 * @since        17/09/2021
 *************************************************************************************/
const mongoose = require("mongoose");
const helper = require("../helper/user.helper");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    googleLogin: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

// now we need to create a collection

const Registration = new mongoose.model("Registration", userSchema);
class UserModel {
  registerUser = (userDetails, callback) => {
    const newUser = new Registration({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
      role: userDetails.role,
    });
    try {
      helper.hashing(userDetails.password, (err, hash) => {
        if (hash) {
            //console.log(hash)
          newUser.password = hash;
          newUser.save((error, data) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, data);
            }
          });
        } else {
          throw err;
        }
      });
    } catch (error) {
      return callback("Internal error", null);
    }
  };
}
module.exports = new UserModel();
