const Joi = require("joi");

const groupValidationSchema = Joi.object({
  group_name: Joi.string().trim().required().min(2).max(100),
  lesson_start_time: Joi.string().trim().required(),
  lesson_continuous: Joi.string().trim().required(),
  lesson_week_day: Joi.string().trim().required(),
  group_stage_id: Joi.string().required(),
  room_number: Joi.string().trim().required(),
  room_floor: Joi.number().required(),
  branch_id: Joi.string().required(),
  lessons_quant: Joi.number().required(),
  is_active: Joi.boolean().required(),
});

const groupUpdateValidationSchema = Joi.object({
  group_name: Joi.string().trim().min(2).max(100).optional(),
  lesson_start_time: Joi.string().trim().optional(),
  lesson_continuous: Joi.string().trim().optional(),
  lesson_week_day: Joi.string().trim().optional(),
  group_stage_id: Joi.string().optional(),
  room_number: Joi.string().trim().optional(),
  room_floor: Joi.number().optional(),
  branch_id: Joi.string().optional(),
  lessons_quant: Joi.number().optional(),
  is_active: Joi.boolean().optional(),
});

module.exports = {
  groupValidationSchema,
  groupUpdateValidationSchema,
};