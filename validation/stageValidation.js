const Joi = require("joi");

const stageValidationSchema = Joi.object({
  name: Joi.string().trim().required().min(2).max(100),
});

const stageUpdateValidationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
});

module.exports = {
  stageValidationSchema,
  stageUpdateValidationSchema,
};