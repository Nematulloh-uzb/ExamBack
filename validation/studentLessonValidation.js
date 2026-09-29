const Joi = require("joi");

const studentLessonValidationSchema = Joi.object({
  lesson_id: Joi.string().required(),
  student_id: Joi.string().required(),
  is_there: Joi.boolean().optional(),
  reason: Joi.string().trim().optional().allow(""),
  be_paid: Joi.boolean().optional(),
});

const studentLessonUpdateValidationSchema = Joi.object({
  lesson_id: Joi.string().optional(),
  student_id: Joi.string().optional(),
  is_there: Joi.boolean().optional(),
  reason: Joi.string().trim().optional().allow(""),
  be_paid: Joi.boolean().optional(),
});

module.exports = {
  studentLessonValidationSchema,
  studentLessonUpdateValidationSchema,
};