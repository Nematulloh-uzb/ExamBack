const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  lidStatusValidationSchema,
  lidStatusUpdateValidationSchema,
} = require("../validation/lidStatusValidation");

const {
  createLidStatus,
  getLidStatuses,
  getLidStatusById,
  updateLidStatus,
  deleteLidStatus,
  searchLidStatus,
} = require("../controllers/lidStatus.controller");

/**
 * @swagger
 * tags:
 *   name: LidStatuses
 *   description: Lid holatlarini boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /lidStatus/createLidStatus:
 *   post:
 *     summary: Yangi lid holati yaratish
 *     tags: [LidStatuses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Holat nomi
 *     responses:
 *       201:
 *         description: LidStatus muvaffaqiyatli yaratildi
 *       400:
 *         description: Bu nomdagi status allaqachon mavjud
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createLidStatus", validateSchema(lidStatusValidationSchema), createLidStatus);

/**
 * @swagger
 * /lidStatus/getLidStatuses:
 *   get:
 *     summary: Barcha lid holatlarini olish
 *     tags: [LidStatuses]
 *     responses:
 *       200:
 *         description: LidStatuslar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getLidStatuses", getLidStatuses);

/**
 * @swagger
 * /lidStatus/getLidStatusById/{id}:
 *   get:
 *     summary: Lid holatini ID bo'yicha olish
 *     tags: [LidStatuses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: LidStatus topildi
 *       404:
 *         description: LidStatus topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getLidStatusById/:id", getLidStatusById);

/**
 * @swagger
 * /lidStatus/searchLidStatus:
 *   get:
 *     summary: Lid holatini qidirish
 *     tags: [LidStatuses]
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
router.get("/searchLidStatus", searchLidStatus);

/**
 * @swagger
 * /lidStatus/updateLidStatus/{id}:
 *   put:
 *     summary: Lid holatini yangilash
 *     tags: [LidStatuses]
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
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: LidStatus yangilandi
 *       404:
 *         description: LidStatus topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateLidStatus/:id", validateSchema(lidStatusUpdateValidationSchema), updateLidStatus);

/**
 * @swagger
 * /lidStatus/deleteLidStatus/{id}:
 *   delete:
 *     summary: Lid holatini o'chirish
 *     tags: [LidStatuses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: LidStatus o'chirildi
 *       404:
 *         description: LidStatus topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.delete("/deleteLidStatus/:id", deleteLidStatus);

module.exports = { lidStatusRouter: router };