const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  roleValidationSchema,
  roleUpdateValidationSchema
} = require("../validation/roleValidation");

const {
  createRole,
  getRoles,
  getRoleById,
  deleteRole,
  updateRole,
  searchRole
} = require("../controllers/role.controller");

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: O'rinlar (Rollar) boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /role/createRole:
 *   post:
 *     summary: Yangi o'rin yaratish
 *     tags: [Roles]
 *     description: Yangi o'rin yaratish uchun endpoint
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
 *       201:
 *         description: O'rin muvaffaqiyatli ro'yhatdan o'tdi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createRole", validateSchema(roleValidationSchema), createRole);

/**
 * @swagger
 * /role/getRoles:
 *   get:
 *     summary: Barcha o'rinlarni olish
 *     tags: [Roles]
 *     description: Barcha o'rinlarni olish uchun endpoint
 *     responses:
 *       200:
 *         description: O'rinlar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getRoles", getRoles);

/**
 * @swagger
 * /role/getRoleById/{id}:
 *   get:
 *     summary: O'rin ID bo'yicha olish
 *     tags: [Roles]
 *     description: O'rinni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: o'rinning ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: O'rin topildi
 *       404:
 *         description: O'rin topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getRoleById/:id", getRoleById);

/**
 * @swagger
 * /role/searchRole:
 *   get:
 *     summary: O'rin qidirish
 *     tags: [Roles]
 *     description: O'rinlarni name orqali qidirish
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
 *         description: O'rin topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/searchRole", searchRole);

/**
 * @swagger
 * /role/deleteRole/{id}:
 *   delete:
 *     summary: O'rinni o'chirish
 *     tags: [Roles]
 *     description: O'rinni ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Xodim ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: O'rin o'chirildi
 *       404:
 *         description: O'rin topilmadi
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteRole/:id", deleteRole);

/**
 * @swagger
 * /role/updateRole/{id}:
 *   put:
 *     summary: Role yangilash
 *     tags: [Roles]
 *     description: O'rin ID bo'yicha yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'rin ID si
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
 *                 description: Yangi O'rin
 *     responses:
 *       200:
 *         description: O'rin yangilandi
 *       400:
 *         description: Yomon so'rov, validatsiya xatosi
 *       404:
 *         description: O'rin topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateRole/:id", validateSchema(roleUpdateValidationSchema), updateRole);

module.exports = { roleRouter: router };
