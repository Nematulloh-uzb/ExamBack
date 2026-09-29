const Joi = require("joi");

const groupStuffValidationSchema = Joi.object({
  group_id: Joi.string().required(),
  stuff_id: Joi.string().required(),
});

const groupStuffUpdateValidationSchema = Joi.object({
  group_id: Joi.string().optional(),
  stuff_id: Joi.string().optional(),
});

module.exports = {
  groupStuffValidationSchema,
  groupStuffUpdateValidationSchema,
};