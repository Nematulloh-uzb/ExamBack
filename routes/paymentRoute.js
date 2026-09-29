const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  paymentValidationSchema,
  paymentUpdateValidationSchema,
} = require("../validation/paymentValidation");

const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: To'lovlarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /payment/createPayment:
 *   post:
 *     summary: Yangi to'lov yaratish
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *               payment_date:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *               is_paid:
 *                 type: boolean
 *               total_attent:
 *                 type: number
 *     responses:
 *       201:
 *         description: Payment muvaffaqiyatli yaratildi
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createPayment", validateSchema(paymentValidationSchema), createPayment);

/**
 * @swagger
 * /payment/getPayments:
 *   get:
 *     summary: Barcha to'lovlarni olish
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Paymentlar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getPayments", getPayments);

/**
 * @swagger
 * /payment/getPaymentById/{id}:
 *   get:
 *     summary: To'lovni ID bo'yicha olish
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment topildi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getPaymentById/:id", getPaymentById);

/**
 * @swagger
 * /payment/updatePayment/{id}:
 *   put:
 *     summary: To'lovni yangilash
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *               payment_date:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *               is_paid:
 *                 type: boolean
 *               total_attent:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment yangilandi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updatePayment/:id", validateSchema(paymentUpdateValidationSchema), updatePayment);

/**
 * @swagger
 * /payment/deletePayment/{id}:
 *   delete:
 *     summary: To'lovni o'chirish
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment o'chirildi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.delete("/deletePayment/:id", deletePayment);

module.exports = { paymentRouter: router };