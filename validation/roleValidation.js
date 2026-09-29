const Joi = require("joi");

const roleValidationSchema = Joi.object({
  name: Joi.string().trim().required()
});

const roleUpdateValidationSchema = Joi.object({
  name: Joi.string().trim().optional()
});

module.exports = {
  roleValidationSchema,
  roleUpdateValidationSchema,
};