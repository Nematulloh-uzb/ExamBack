const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  studentValidationSchema,
  studentUpdateValidationSchema,
} = require("../validation/studentValidation");

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudent,
} = require("../controllers/student.controller");

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Talabalarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /student/createStudent:
 *   post:
 *     summary: Yangi talaba yaratish
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lid_id:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *     responses:
 *       201:
 *         description: Student muvaffaqiyatli yaratildi
 *       400:
 *         description: Bu lid allaqachon talabaga aylantirilgan
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createStudent", validateSchema(studentValidationSchema), createStudent);

/**
 * @swagger
 * /student/getStudents:
 *   get:
 *     summary: Barcha talabalarni olish
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Studentlar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStudents", getStudents);

/**
 * @swagger
 * /student/getStudentById/{id}:
 *   get:
 *     summary: Talabani ID bo'yicha olish
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student topildi
 *       404:
 *         description: Student topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStudentById/:id", getStudentById);

/**
 * @swagger
 * /student/searchStudent:
 *   get:
 *     summary: Talabani qidirish
 *     tags: [Students]
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
router.get("/searchStudent", searchStudent);

/**
 * @swagger
 * /student/updateStudent/{id}:
 *   put:
 *     summary: Talabani yangilash
 *     tags: [Students]
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
 *               lid_id:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *     responses:
 *       200:
 *         description: Student yangilandi
 *       404:
 *         description: Student topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateStudent/:id", validateSchema(studentUpdateValidationSchema), updateStudent);

/**
 * @swagger
 * /student/deleteStudent/{id}:
 *   delete:
 *     summary: Talabani o'chirish
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student o'chirildi
 *       404:
 *         description: Student topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.delete("/deleteStudent/:id", deleteStudent);

module.exports = { studentRouter: router };