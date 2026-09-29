const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  studentLessonValidationSchema,
  studentLessonUpdateValidationSchema,
} = require("../validation/studentLessonValidation");

const {
  createStudentLesson,
  getStudentLessons,
  getStudentLessonById,
  updateStudentLesson,
  deleteStudentLesson,
} = require("../controllers/studentLesson.controller");

/**
 * @swagger
 * tags:
 *   name: StudentLessons
 *   description: Davomatni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /studentLesson/createStudentLesson:
 *   post:
 *     summary: Yangi davomat yozuvi yaratish
 *     tags: [StudentLessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_id:
 *                 type: string
 *               student_id:
 *                 type: string
 *               is_there:
 *                 type: boolean
 *               reason:
 *                 type: string
 *               be_paid:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: StudentLesson muvaffaqiyatli yaratildi
 *       400:
 *         description: Bu talaba bu darsga allaqachon belgilangan
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createStudentLesson", validateSchema(studentLessonValidationSchema), createStudentLesson);

/**
 * @swagger
 * /studentLesson/getStudentLessons:
 *   get:
 *     summary: Barcha davomat yozuvlarini olish
 *     tags: [StudentLessons]
 *     responses:
 *       200:
 *         description: StudentLessonlar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStudentLessons", getStudentLessons);

/**
 * @swagger
 * /studentLesson/getStudentLessonById/{id}:
 *   get:
 *     summary: Davomat yozuvini ID bo'yicha olish
 *     tags: [StudentLessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StudentLesson topildi
 *       404:
 *         description: StudentLesson topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStudentLessonById/:id", getStudentLessonById);

/**
 * @swagger
 * /studentLesson/updateStudentLesson/{id}:
 *   put:
 *     summary: Davomat yozuvini yangilash
 *     tags: [StudentLessons]
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
 *               lesson_id:
 *                 type: string
 *               student_id:
 *                 type: string
 *               is_there:
 *                 type: boolean
 *               reason:
 *                 type: string
 *               be_paid:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: StudentLesson yangilandi
 *       404:
 *         description: StudentLesson topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateStudentLesson/:id", validateSchema(studentLessonUpdateValidationSchema), updateStudentLesson);

/**
 * @swagger
 * /studentLesson/deleteStudentLesson/{id}:
 *   delete:
 *     summary: Davomat yozuvini o'chirish
 *     tags: [StudentLessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StudentLesson o'chirildi
 *       404:
 *         description: StudentLesson topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.delete("/deleteStudentLesson/:id", deleteStudentLesson);

module.exports = { studentLessonRouter: router };