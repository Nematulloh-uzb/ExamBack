const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  reasonLidValidationSchema,
  reasonLidUpdateValidationSchema,
} = require("../validation/reasonLidValidation");

const {
  createReasonLid,
  getReasonLids,
  getReasonLidById,
  updateReasonLid,
  deleteReasonLid,
  searchReasonLid,
} = require("../controllers/reasonLid.controller");

/**
 * @swagger
 * tags:
 *   name: ReasonLids
 *   description: Lid bekor qilish sabablarini boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /reasonLid/createReasonLid:
 *   post:
 *     summary: Yangi sabab yaratish
 *     tags: [ReasonLids]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason_lid:
 *                 type: string
 *     responses:
 *       201:
 *         description: ReasonLid muvaffaqiyatli yaratildi
 *       400:
 *         description: Bu sabab allaqachon mavjud
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createReasonLid", validateSchema(reasonLidValidationSchema), createReasonLid);

/**
 * @swagger
 * /reasonLid/getReasonLids:
 *   get:
 *     summary: Barcha sabablarni olish
 *     tags: [ReasonLids]
 *     responses:
 *       200:
 *         description: ReasonLidlar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getReasonLids", getReasonLids);

/**
 * @swagger
 * /reasonLid/getReasonLidById/{id}:
 *   get:
 *     summary: Sababni ID bo'yicha olish
 *     tags: [ReasonLids]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ReasonLid topildi
 *       404:
 *         description: ReasonLid topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getReasonLidById/:id", getReasonLidById);

/**
 * @swagger
 * /reasonLid/searchReasonLid:
 *   get:
 *     summary: Sababni qidirish
 *     tags: [ReasonLids]
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
router.get("/searchReasonLid", searchReasonLid);

/**
 * @swagger
 * /reasonLid/updateReasonLid/{id}:
 *   put:
 *     summary: Sababni yangilash
 *     tags: [ReasonLids]
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
 *               reason_lid:
 *                 type: string
 *     responses:
 *       200:
 *         description: ReasonLid yangilandi
 *       404:
 *         description: ReasonLid topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateReasonLid/:id", validateSchema(reasonLidUpdateValidationSchema), updateReasonLid);

/**
 * @swagger
 * /reasonLid/deleteReasonLid/{id}:
 *   delete:
 *     summary: Sababni o'chirish
 *     tags: [ReasonLids]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ReasonLid o'chirildi
 *       404:
 *         description: ReasonLid topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.delete("/deleteReasonLid/:id", deleteReasonLid);

module.exports = { reasonLidRouter: router };