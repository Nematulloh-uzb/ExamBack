const Joi = require("joi");

const stuffRoleValidationSchema = Joi.object({
  stuff_id: Joi.string().required(),
  role_id: Joi.string().required(),
});

const stuffRoleUpdateValidationSchema = Joi.object({
  stuff_id: Joi.string().optional(),
  role_id: Joi.string().optional(),
});

module.exports = {
  stuffRoleValidationSchema,
  stuffRoleUpdateValidationSchema
};