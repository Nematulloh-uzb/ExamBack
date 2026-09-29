const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const { lessonValidationSchema, lessonUpdateValidationSchema } = require("../validation/lessonValidation");
const { createLesson, getLessons, getLessonById, updateLesson, deleteLesson, searchLesson } = require("../controllers/lesson.controller");

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Darslarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /lesson/createLesson:
 *   post:
 *     summary: Yangi dars yaratish
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_theme:
 *                 type: string
 *               lesson_number:
 *                 type: number
 *               group_id:
 *                 type: string
 *               lesson_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Lesson yaratildi
 */
router.post("/createLesson", validateSchema(lessonValidationSchema), createLesson);

/**
 * @swagger
 * /lesson/getLessons:
 *   get:
 *     summary: Barcha darslarni olish
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: Lessonlar ro'yxati
 */
router.get("/getLessons", getLessons);

/**
 * @swagger
 * /lesson/getLessonById/{id}:
 *   get:
 *     summary: Darsni ID bo'yicha olish
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson topildi
 */
router.get("/getLessonById/:id", getLessonById);

/**
 * @swagger
 * /lesson/searchLesson:
 *   get:
 *     summary: Darsni qidirish
 *     tags: [Lessons]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
router.get("/searchLesson", searchLesson);

/**
 * @swagger
 * /lesson/updateLesson/{id}:
 *   put:
 *     summary: Darsni yangilash
 *     tags: [Lessons]
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
 *               lesson_theme:
 *                 type: string
 *               lesson_number:
 *                 type: number
 *               group_id:
 *                 type: string
 *               lesson_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Lesson yangilandi
 */
router.put("/updateLesson/:id", validateSchema(lessonUpdateValidationSchema), updateLesson);

/**
 * @swagger
 * /lesson/deleteLesson/{id}:
 *   delete:
 *     summary: Darsni o'chirish
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson o'chirildi
 */
router.delete("/deleteLesson/:id", deleteLesson);

module.exports = { lessonRouter: router };