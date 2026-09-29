const Joi = require("joi");

const lessonValidationSchema = Joi.object({
  lesson_theme: Joi.string().trim().required().min(2).max(200),
  lesson_number: Joi.number().required().min(1),
  group_id: Joi.string().required(),
  lesson_date: Joi.date().required(),
});

const lessonUpdateValidationSchema = Joi.object({
  lesson_theme: Joi.string().trim().min(2).max(200).optional(),
  lesson_number: Joi.number().min(1).optional(),
  group_id: Joi.string().optional(),
  lesson_date: Joi.date().optional(),
});

module.exports = { lessonValidationSchema, lessonUpdateValidationSchema };