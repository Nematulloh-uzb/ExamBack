const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  stageValidationSchema,
  stageUpdateValidationSchema,
} = require("../validation/stageValidation");

const {
  createStage,
  getStages,
  getStageById,
  updateStage,
  deleteStage,
  searchStage,
} = require("../controllers/stage.controller");

/**
 * @swagger
 * tags:
 *   name: Stages
 *   description: Lid bosqichlarini boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /stage/createStage:
 *   post:
 *     summary: Yangi bosqich yaratish
 *     tags: [Stages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Bosqich nomi
 *     responses:
 *       201:
 *         description: Stage muvaffaqiyatli yaratildi
 *       400:
 *         description: Bu nomdagi bosqich allaqachon mavjud
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createStage", validateSchema(stageValidationSchema), createStage);

/**
 * @swagger
 * /stage/getStages:
 *   get:
 *     summary: Barcha bosqichlarni olish
 *     tags: [Stages]
 *     responses:
 *       200:
 *         description: Stagelar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStages", getStages);

/**
 * @swagger
 * /stage/getStageById/{id}:
 *   get:
 *     summary: Bosqichni ID bo'yicha olish
 *     tags: [Stages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stage topildi
 *       404:
 *         description: Stage topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStageById/:id", getStageById);

/**
 * @swagger
 * /stage/searchStage:
 *   get:
 *     summary: Bosqichni qidirish
 *     tags: [Stages]
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
router.get("/searchStage", searchStage);

/**
 * @swagger
 * /stage/updateStage/{id}:
 *   put:
 *     summary: Bosqichni yangilash
 *     tags: [Stages]
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stage yangilandi
 *       404:
 *         description: Stage topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateStage/:id", validateSchema(stageUpdateValidationSchema), updateStage);

/**
 * @swagger
 * /stage/deleteStage/{id}:
 *   delete:
 *     summary: Bosqichni o'chirish
 *     tags: [Stages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stage o'chirildi
 *       404:
 *         description: Stage topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.delete("/deleteStage/:id", deleteStage);

module.exports = { stageRouter: router };