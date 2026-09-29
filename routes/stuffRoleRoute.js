const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  stuffRoleValidationSchema,
  stuffRoleUpdateValidationSchema
} = require("../validation/stuffRoleValidation");

const {
  createStuffRole,
  getStuffRoles,
  getStuffRoleById,
  deleteStuffRole,
  updateStuffRole
} = require("../controllers/stuffRole.controller");

/**
 * @swagger
 * tags:
 *   name: StuffRoles
 *   description: StuffRole boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /stuffRole/createStuffRole:
 *   post:
 *     summary: Yangi StuffRole yaratish
 *     tags: [StuffRoles]
 *     description: Yangi StuffRole yaratish uchun endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stuff_id:
 *                 type: string
 *               role_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: StuffRole muvaffaqiyatli yaratildi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createStuffRole", validateSchema(stuffRoleValidationSchema), createStuffRole);

/**
 * @swagger
 * /stuffRole/getStuffRoles:
 *   get:
 *     summary: Barcha StuffRolelarni olish
 *     tags: [StuffRoles]
 *     description: Barcha StuffRolelarni olish uhcun.
 *     responses:
 *       200:
 *         description: StuffRolelar ro'yxati olind
 *       500:
 *         description: Ichki server xatosi.
 */
router.get("/getStuffRoles", getStuffRoles);

/**
 * @swagger
 * /stuffRole/getStuffRoleById/{id}:
 *   get:
 *     summary: StuffRole ni ID bo'yicha olish
 *     tags: [StuffRoles]
 *     description: StuffRole ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: StuffRole ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StuffRole topildi.
 *       404:
 *         description: StuffRole toplmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getStuffRoleById/:id", getStuffRoleById);

/**
 * @swagger
 * /stuffRole/deleteStuffRole/{id}:
 *   delete:
 *     summary: StuffRole ni o'chirish
 *     tags: [StuffRoles]
 *     description: StuffRole ni ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: StuffRole ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StuffRole o'chirildi.
 *       404:
 *         description: StuffRole topilmadi
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteStuffRole/:id", deleteStuffRole);

/**
 * @swagger
 * /stuffRole/updateStuffRole/{id}:
 *   put:
 *     summary: StuffRole ni yangilash
 *     tags: [StuffRoles]
 *     description: StuffRole ni ID bo'yicha yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: StuffRole ID si
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
 *               stuff_id:
 *                 type: string
 *                 description: Yangi stuff_id
 *               role_id:
 *                 type: string
 *                 description: Yangi role_id
 *     responses:
 *       200:
 *         description: StuffRole yangilandi
 *       400:
 *         description: Yomon so'rov, validatsiya xatosi
 *       404:
 *         description: StuffRole topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateStuffRole/:id", validateSchema(stuffRoleUpdateValidationSchema), updateStuffRole);

module.exports = { stuffRoleRouter: router };