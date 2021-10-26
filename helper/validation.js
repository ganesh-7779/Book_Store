const Joi = require("joi");
class Validation {
  validateSchema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .required()
      .pattern(
        new RegExp(
          "^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)"
        )
      ),

    lastName: Joi.string().min(2).required(),

    email: Joi.string()
      .required()
      .pattern(
        new RegExp(
          '^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9._+!%-]{1,64}|)|"[a-zA-Z0-9.+! -]{1,64}")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$'
        )
      ),

    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
    role: Joi.string(),
    googleLogin: Joi.boolean(),
    googleId: Joi.string(),
  });
  
  loginSchema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9._+!%-]{1,64}|)|\"[a-zA-Z0-9.+! -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$"
        )
      ),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required()
  });
}
module.exports = new Validation();
