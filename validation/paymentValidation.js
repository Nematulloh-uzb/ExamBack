const Joi = require("joi");

const paymentValidationSchema = Joi.object({
  student_id: Joi.string().required(),
  payment_last_date: Joi.date().optional(),
  payment_date: Joi.date().optional(),
  price: Joi.number().optional(),
  is_paid: Joi.boolean().optional(),
  total_attent: Joi.number().optional(),
});

const paymentUpdateValidationSchema = Joi.object({
  student_id: Joi.string().optional(),
  payment_last_date: Joi.date().optional(),
  payment_date: Joi.date().optional(),
  price: Joi.number().optional(),
  is_paid: Joi.boolean().optional(),
  total_attent: Joi.number().optional(),
});

module.exports = {
  paymentValidationSchema,
  paymentUpdateValidationSchema,
};