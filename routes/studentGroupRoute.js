const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  studentGroupValidationSchema,
  studentGroupUpdateValidationSchema,
} = require("../validation/studentGroupValidation");

const {
  createStudentGroup,
  getStudentGroups,
  getStudentGroupById,
  updateStudentGroup,
  deleteStudentGroup,
} = require("../controllers/studentGroup.controller");

/**
 * @swagger
 * tags:
 *   name: StudentGroups
 *   description: Talaba va guruhlarni bog'lash uchun API endpointlari
 */

/**
 * @swagger
 * /studentGroup/createStudentGroup:
 *   post:
 *     summary: Yangi StudentGroup yaratish
 *     tags: [StudentGroups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               group_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: StudentGroup muvaffaqiyatli yaratildi
 *       400:
 *         description: Bu talaba allaqachon bu guruhga qo'shilgan
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createStudentGroup", validateSchema(studentGroupValidationSchema), createStudentGroup);

/**
 * @swagger
 * /studentGroup/getStudentGroups:
 *   get:
 *     summary: Barcha StudentGrouplarni olish
 *     tags: [StudentGroups]
 *     responses:
 *       200:
 *         description: StudentGrouplar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStudentGroups", getStudentGroups);

/**
 * @swagger
 * /studentGroup/getStudentGroupById/{id}:
 *   get:
 *     summary: StudentGroupni ID bo'yicha olish
 *     tags: [StudentGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StudentGroup topildi
 *       404:
 *         description: StudentGroup topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStudentGroupById/:id", getStudentGroupById);

/**
 * @swagger
 * /studentGroup/updateStudentGroup/{id}:
 *   put:
 *     summary: StudentGroupni yangilash
 *     tags: [StudentGroups]
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
 *               group_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: StudentGroup yangilandi
 *       404:
 *         description: StudentGroup topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateStudentGroup/:id", validateSchema(studentGroupUpdateValidationSchema), updateStudentGroup);

/**
 * @swagger
 * /studentGroup/deleteStudentGroup/{id}:
 *   delete:
 *     summary: StudentGroupni o'chirish
 *     tags: [StudentGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StudentGroup o'chirildi
 *       404:
 *         description: StudentGroup topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.delete("/deleteStudentGroup/:id", deleteStudentGroup);

module.exports = { studentGroupRouter: router };