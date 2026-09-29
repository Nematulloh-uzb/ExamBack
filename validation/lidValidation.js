const Joi = require("joi");

const lidValidationSchema = Joi.object({
  first_name: Joi.string().trim().required().min(2).max(50),
  last_name: Joi.string().trim().required().min(2).max(50),
  phone_number: Joi.string().pattern(/^\+998\d{9}$/).required(),
  lid_stage_id: Joi.string().required(),
  test_date: Joi.date().optional(),
  trial_lesson_date: Joi.date().optional(),
  trial_lesson_time: Joi.string().trim().optional().allow(""),
  trial_lesson_group_id: Joi.string().hex().length(24).optional().allow(null, ""),
  lid_status_id: Joi.string().required(),
  cancel_reason_id: Joi.string().optional().allow(""),
});

const lidUpdateValidationSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(50).optional(),
  last_name: Joi.string().trim().min(2).max(50).optional(),
  phone_number: Joi.string().pattern(/^\+998\d{9}$/).optional(),
  lid_stage_id: Joi.string().optional(),
  test_date: Joi.date().optional(),
  trial_lesson_date: Joi.date().optional(),
  trial_lesson_time: Joi.string().trim().optional().allow(""),
  trial_lesson_group_id: Joi.string().hex().length(24).optional().allow(null, ""),
  lid_status_id: Joi.string().optional(),
  cancel_reason_id: Joi.string().optional().allow(""),
});

module.exports = {
  lidValidationSchema,
  lidUpdateValidationSchema,
};