const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  lidValidationSchema,
  lidUpdateValidationSchema,
} = require("../validation/lidValidation");

const {
  createLid,
  getLids,
  getLidById,
  updateLid,
  deleteLid,
  searchLid,
} = require("../controllers/lid.controller");

/**
 * @swagger
 * tags:
 *   name: Lids
 *   description: Potensial mijozlarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /lid/createLid:
 *   post:
 *     summary: Yangi lid yaratish
 *     tags: [Lids]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               lid_stage_id:
 *                 type: string
 *               test_date:
 *                 type: string
 *                 format: date
 *               trial_lesson_date:
 *                 type: string
 *                 format: date
 *               trial_lesson_time:
 *                 type: string
 *               trial_lesson_group_id:
 *                 type: number
 *               lid_status_id:
 *                 type: string
 *               cancel_reason_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lid muvaffaqiyatli yaratildi
 *       400:
 *         description: Bu telefon raqam bilan lid allaqachon mavjud
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createLid", validateSchema(lidValidationSchema), createLid);

/**
 * @swagger
 * /lid/getLids:
 *   get:
 *     summary: Barcha lidlarni olish
 *     tags: [Lids]
 *     responses:
 *       200:
 *         description: Lidlar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getLids", getLids);

/**
 * @swagger
 * /lid/getLidById/{id}:
 *   get:
 *     summary: Lidni ID bo'yicha olish
 *     tags: [Lids]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lid topildi
 *       404:
 *         description: Lid topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getLidById/:id", getLidById);

/**
 * @swagger
 * /lid/searchLid:
 *   get:
 *     summary: Lidni qidirish
 *     tags: [Lids]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari olindi
 *       400:
 *         description: Qidirish muvaffaqiyatsiz bo'ldi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/searchLid", searchLid);

/**
 * @swagger
 * /lid/updateLid/{id}:
 *   put:
 *     summary: Lidni yangilash
 *     tags: [Lids]
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
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               lid_stage_id:
 *                 type: string
 *               test_date:
 *                 type: string
 *                 format: date
 *               trial_lesson_date:
 *                 type: string
 *                 format: date
 *               trial_lesson_time:
 *                 type: string
 *               trial_lesson_group_id:
 *                 type: number
 *               lid_status_id:
 *                 type: string
 *               cancel_reason_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lid yangilandi
 *       404:
 *         description: Lid topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateLid/:id", validateSchema(lidUpdateValidationSchema), updateLid);

/**
 * @swagger
 * /lid/deleteLid/{id}:
 *   delete:
 *     summary: Lidni o'chirish
 *     tags: [Lids]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lid o'chirildi
 *       404:
 *         description: Lid topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.delete("/deleteLid/:id", deleteLid);

module.exports = { lidRouter: router };