const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class Helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        throw err;
      } else {
        return callback(null, hash);
      }
    });
  };

  generateToken = (data) => {
    const dataForToken = {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role
    };
    // console.log(dataForToken);
    return jwt.sign({ dataForToken }, process.env.SECRET_KEY);
  }

  auth = (req, res, next) => {
    const header = req.headers.authorization;
    const myArr = header.split(" ");
    const token = myArr[1];
    // console.log(token);
    try {
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
          if (error) {
            return res.status(400).send({ success: false, message: "Invalid Token" });
          } else {
            req.user = decoded;
            // console.log(req.user);
            next();
          }
        });
      } else {
        return res.status(401).send({ success: false, message: "Authorisation failed! Invalid user" });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: "Something went wrong!" });
    }
  }

   admin = (req, res, next) => {
    if (req.user && req.user.role === Admin) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an admin')
    }
  }
}
module.exports= new Helper()
