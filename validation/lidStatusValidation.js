const Joi = require("joi");

const lidStatusValidationSchema = Joi.object({
  status: Joi.string().trim().required().min(2).max(100),
});

const lidStatusUpdateValidationSchema = Joi.object({
  status: Joi.string().trim().min(2).max(100).optional(),
});

module.exports = {
  lidStatusValidationSchema,
  lidStatusUpdateValidationSchema,
};