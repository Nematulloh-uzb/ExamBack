const Joi = require("joi");

const stuffValidationSchema = Joi.object({
  first_name: Joi.string().trim().allow("").required(),
  last_name: Joi.string().trim().allow("").required(),
  phone_number: Joi.string().pattern(/^\+998\d{9}$/).allow(""),
  login: Joi.string().trim().required().min(3).max(50),
  parol: Joi.string()
    .required()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/
    ),
  is_active: Joi.boolean().required(),
});

const stuffUpdateValidationSchema = Joi.object({
  first_name: Joi.string().trim().allow("").optional(),
  last_name: Joi.string().trim().allow("").optional(),
  phone_number: Joi.string().pattern(/^\+998\d{9}$/).allow("").optional(),
  login: Joi.string().trim().min(3).max(50).optional(),
  parol: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/
    ),
  is_active: Joi.boolean().optional(),
});

module.exports = {
  stuffValidationSchema,
  stuffUpdateValidationSchema
};