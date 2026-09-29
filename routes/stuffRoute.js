const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  stuffValidationSchema,
  stuffUpdateValidationSchema
} = require("../validation/stuffValidation");

const {
  createStuff,
  getStuffs,
  getStuffById,
  deleteStuff,
  updateStuff,
  searchStuff
} = require("../controllers/stuff.controller");

/**
 * @swagger
 * tags:
 *   name: Stuffs
 *   description: Xodimlar boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /stuff/createStuff:
 *   post:
 *     summary: Yangi xodim yaratish
 *     tags: [Stuffs]
 *     description: Yangi xodim yaratish uchun endpoint
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
 *               login:
 *                 type: string
 *               parol:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               role_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Xodim muvaffaqiyatli ro'yhatdan o'tdi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createStuff", validateSchema(stuffValidationSchema), createStuff);

/**
 * @swagger
 * /stuff/getStuffs:
 *   get:
 *     summary: Barcha xodimlarni olish
 *     tags: [Stuffs]
 *     description: Barcha xodimlarni olish uchun endpoint
 *     responses:
 *       200:
 *         description: Xodimlar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStuffs", getStuffs);

/**
 * @swagger
 * /stuff/getStuffById/{id}:
 *   get:
 *     summary: Xodimni ID bo'yicha olish
 *     tags: [Stuffs]
 *     description: Xodimni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: xodim ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xodim topildi
 *       404:
 *         description: Xodim topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStuffById/:id", getStuffById);

/**
 * @swagger
 * /stuff/searchStuff:
 *   get:
 *     summary: Xodimni qidirish
 *     tags: [Stuffs]
 *     description: Xodimlarni username, lastname, address yoki phone orqali qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       404:
 *         description: Xodim topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/searchStuff", searchStuff);

/**
 * @swagger
 * /stuff/deleteStuff/{id}:
 *   delete:
 *     summary: Xodimni o'chirish
 *     tags: [Stuffs]
 *     description: Xodimni ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Xodim ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xodim o'chirildi
 *       404:
 *         description: Xodim topilmadi
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteStuff/:id", deleteStuff);

/**
 * @swagger
 * /stuff/updateStuff/{id}:
 *   put:
 *     summary: Xodimni yangilash
 *     tags: [Stuffs]
 *     description: Xodimni ID bo'yicha yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Xodim ID si
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
 *                 description: Yangi Ism
 *               last_name:
 *                 type: string
 *                 description: Yangi Familiya
 *               phone_number:
 *                 type: string
 *                 description: Yangi Tel. raqam
 *               login:
 *                 type: string
 *                 description: Yangi LogIn
 *               parol:
 *                 type: string
 *                 description: Yangi Parol
 *               is_active:
 *                 type: string
 *                 description: Yangi Online/Offline bo'lgannini tahirirlash
 *     responses:
 *       200:
 *         description: Xodim yangilandi
 *       400:
 *         description: Yomon so'rov, validatsiya xatosi
 *       404:
 *         description: Xodim topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateStuff/:id", validateSchema(stuffUpdateValidationSchema), updateStuff);

module.exports = { stuffRouter: router };