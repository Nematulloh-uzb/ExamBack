const Joi = require("joi");

const studentValidationSchema = Joi.object({
  lid_id: Joi.string().required(),
  first_name: Joi.string().trim().required().min(2).max(50),
  last_name: Joi.string().trim().required().min(2).max(50),
  phone_number: Joi.string().pattern(/^\+998\d{9}$/).required(),
  birthday: Joi.date().optional(),
  gender: Joi.string().optional(),
});

const studentUpdateValidationSchema = Joi.object({
  lid_id: Joi.string().optional(),
  first_name: Joi.string().trim().min(2).max(50).optional(),
  last_name: Joi.string().trim().min(2).max(50).optional(),
  phone_number: Joi.string().pattern(/^\+998\d{9}$/).optional(),
  birthday: Joi.date().optional(),
  gender: Joi.string().optional(),
});

module.exports = {
  studentValidationSchema,
  studentUpdateValidationSchema,
};