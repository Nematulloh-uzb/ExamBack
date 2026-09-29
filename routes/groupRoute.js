const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  groupValidationSchema,
  groupUpdateValidationSchema
} = require("../validation/groupValidation");

const {
  createGroup,
  getGroups,
  getGroupById,
  deleteGroup,
  updateGroup,
  searchGroup
} = require("../controllers/group.controller");

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Guruhlar boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /group/createGroup:
 *   post:
 *     summary: Yangi guruh yaratish
 *     tags: [Groups]
 *     description: Yangi guruh yaratish uchun endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_name:
 *                 type: string
 *               lesson_start_time:
 *                 type: string
 *               lesson_continuous:
 *                 type: string
 *               lesson_week_day:
 *                 type: string
 *               group_stage_id:
 *                 type: number
 *               room_number:
 *                 type: string
 *               room_floor:
 *                 type: number
 *               branch_id:
 *                 type: number
 *               lessons_quant:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Guruh muvaffaqiyatli ro'yhatdan o'tdi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createGroup", validateSchema(groupValidationSchema), createGroup);

/**
 * @swagger
 * /group/getGroups:
 *   get:
 *     summary: Barcha guruhlarni olish
 *     tags: [Groups]
 *     description: Barcha guruhlarni olish uchun endpoint
 *     responses:
 *       200:
 *         description: Guruhlar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getGroups", getGroups);

/**
 * @swagger
 * /group/getGroupById/{id}:
 *   get:
 *     summary: Guruhni ID bo'yicha olish
 *     tags: [Groups]
 *     description: Guruhni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: guruh ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Guruh topildi
 *       404:
 *         description: Guruh topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getGroupById/:id", getGroupById);

/**
 * @swagger
 * /group/searchGroup:
 *   get:
 *     summary: Guruhni qidirish
 *     tags: [Groups]
 *     description: Guruhlarni group_name, lesson_week_day, room_number yoki lesson_start_time orqali qidirish
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
 *         description: Guruh topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/searchGroup", searchGroup);

/**
 * @swagger
 * /group/deleteGroup/{id}:
 *   delete:
 *     summary: Guruhni o'chirish
 *     tags: [Groups]
 *     description: Guruhni ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Guruh ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Guruh o'chirildi
 *       404:
 *         description: Guruh topilmadi
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteGroup/:id", deleteGroup);

/**
 * @swagger
 * /group/updateGroup/{id}:
 *   put:
 *     summary: Guruhni yangilash
 *     tags: [Groups]
 *     description: Guruhni ID bo'yicha yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Guruh ID si
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
 *               group_name:
 *                 type: string
 *                 description: Yangi guruh nomi
 *               lesson_start_time:
 *                 type: string
 *                 description: Yangi dars boshlanish vaqti
 *               lesson_continuous:
 *                 type: string
 *                 description: Yangi dars davomiyligi
 *               lesson_week_day:
 *                 type: string
 *                 description: Yangi hafta kuni
 *               group_stage_id:
 *                 type: number
 *                 description: Yangi bosqich ID
 *               room_number:
 *                 type: string
 *                 description: Yangi xona raqami
 *               room_floor:
 *                 type: number
 *                 description: Yangi qavat
 *               branch_id:
 *                 type: number
 *                 description: Yangi filial ID
 *               lessons_quant:
 *                 type: number
 *                 description: Yangi darslar soni
 *               is_active:
 *                 type: boolean
 *                 description: Faol yoki faol emas
 *     responses:
 *       200:
 *         description: Guruh yangilandi
 *       400:
 *         description: Yomon so'rov, validatsiya xatosi
 *       404:
 *         description: Guruh topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateGroup/:id", validateSchema(groupUpdateValidationSchema), updateGroup);

module.exports = { groupRouter: router };