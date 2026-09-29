const Joi = require("joi");

const reasonLidValidationSchema = Joi.object({
  reason_lid: Joi.string().trim().required().min(2).max(200),
});

const reasonLidUpdateValidationSchema = Joi.object({
  reason_lid: Joi.string().trim().min(2).max(200).optional(),
});

module.exports = {
  reasonLidValidationSchema,
  reasonLidUpdateValidationSchema,
};