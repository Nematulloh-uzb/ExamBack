const Joi = require("joi");

const studentGroupValidationSchema = Joi.object({
  student_id: Joi.string().required(),
  group_id: Joi.string().required(),
});

const studentGroupUpdateValidationSchema = Joi.object({
  student_id: Joi.string().optional(),
  group_id: Joi.string().optional(),
});

module.exports = {
  studentGroupValidationSchema,
  studentGroupUpdateValidationSchema,
};