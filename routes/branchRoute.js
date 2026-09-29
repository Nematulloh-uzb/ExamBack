const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  branchValidationSchema,
  branchUpdateValidationSchema
} = require("../validation/branchValidation");

const {
  createBranch,
  getBranchs,
  getBranchById,
  deleteBranch,
  updateBranch,
  searchBranch,
} = require("../controllers/branch.controller");

/**
 * @swagger
 * tags:
 *   name: Branchs
 *   description: Filiallar boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /branch/createBranch:
 *   post:
 *     summary: Yangi filial yaratish
 *     tags: [Branchs]
 *     description: Yangi filial yaratish uchun endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               call_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filial muvaffaqiyatli ro'yhatdan o'tdi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createBranch", validateSchema(branchValidationSchema), createBranch);

/**
 * @swagger
 * /branch/getBranchs:
 *   get:
 *     summary: Barcha filiallarni olish
 *     tags: [Branchs]
 *     description: Barcha filiallarni olish uchun endpoint
 *     responses:
 *       200:
 *         description: Filiallar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getBranchs", getBranchs);

/**
 * @swagger
 * /branch/getBranchById/{id}:
 *   get:
 *     summary: Filialni ID bo'yicha olish
 *     tags: [Branchs]
 *     description: Filialni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: filial ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filial topildi
 *       404:
 *         description: Filial topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getBranchById/:id", getBranchById);

/**
 * @swagger
 * /branch/searchBranch:
 *   get:
 *     summary: Filialni qidirish
 *     tags: [Branchs]
 *     description: Filiallarni name, address yoki call_number orqali qidirish
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
 *         description: Filial topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/searchBranch", searchBranch);

/**
 * @swagger
 * /branch/deleteBranch/{id}:
 *   delete:
 *     summary: Filialni o'chirish
 *     tags: [Branchs]
 *     description: Filialni ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Filial ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filial o'chirildi
 *       404:
 *         description: Filial topilmadi
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteBranch/:id", deleteBranch);

/**
 * @swagger
 * /branch/updateBranch/{id}:
 *   put:
 *     summary: Filialni yangilash
 *     tags: [Branchs]
 *     description: Filialni ID bo'yicha yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Filial ID si
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
 *                 description: Yangi nomi
 *               address:
 *                 type: string
 *                 description: Yangi manzil
 *               call_number:
 *                 type: string
 *                 description: Yangi tel. raqam
 *     responses:
 *       200:
 *         description: Filial yangilandi
 *       400:
 *         description: Yomon so'rov, validatsiya xatosi
 *       404:
 *         description: Filial topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateBranch/:id", validateSchema(branchUpdateValidationSchema), updateBranch);

module.exports = { branchRouter: router };