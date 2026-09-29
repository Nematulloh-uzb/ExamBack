const Joi = require("joi");

const branchValidationSchema = Joi.object({
  name: Joi.string().trim().allow("").required(),
  address: Joi.string().allow(""),
  call_number: Joi.string().pattern(/^\+998\d{9}$/).allow(""),
});

const branchUpdateValidationSchema = Joi.object({
  name: Joi.string().trim().allow("").optional(),
  address: Joi.string().allow("").optional(),
  call_number: Joi.string().pattern(/^\+998\d{9}$/).allow("").optional(),
})

module.exports = {
  branchValidationSchema,
  branchUpdateValidationSchema,
};