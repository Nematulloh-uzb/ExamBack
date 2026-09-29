const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  groupStuffValidationSchema,
  groupStuffUpdateValidationSchema,
} = require("../validation/groupStuffValidation");

const {
  createGroupStuff,
  getGroupStuffs,
  getGroupStuffById,
  deleteGroupStuff,
  updateGroupStuff,
} = require("../controllers/groupStuff.controller");

/**
 * @swagger
 * tags:
 *   name: GroupStuffs
 *   description: Guruh va xodimlarni bog'lash uchun API endpointlari
 */

/**
 * @swagger
 * /groupStuff/createGroupStuff:
 *   post:
 *     summary: Yangi GroupStuff (guruh-xodim birikmasi) yaratish
 *     tags: [GroupStuffs]
 *     description: Guruhga xodim biriktirish uchun endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_id:
 *                 type: string
 *                 description: Guruh ID si
 *               stuff_id:
 *                 type: string
 *                 description: Xodim ID si
 *     responses:
 *       201:
 *         description: GroupStuff muvaffaqiyatli yaratildi
 *       400:
 *         description: Bu xodim allaqachon bu guruhga biriktirilgan
 *       500:
 *         description: Ichki server xatosi
 */
router.post("/createGroupStuff", validateSchema(groupStuffValidationSchema), createGroupStuff);

/**
 * @swagger
 * /groupStuff/getGroupStuffs:
 *   get:
 *     summary: Barcha GroupStufflarni olish
 *     tags: [GroupStuffs]
 *     description: Barcha guruh-xodim birikmalarini olish
 *     responses:
 *       200:
 *         description: GroupStufflar ro'yxati olindi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getGroupStuffs", getGroupStuffs);

/**
 * @swagger
 * /groupStuff/getGroupStuffById/{id}:
 *   get:
 *     summary: GroupStuffni ID bo'yicha olish
 *     tags: [GroupStuffs]
 *     description: GroupStuffni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: GroupStuff ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: GroupStuff topildi
 *       404:
 *         description: GroupStuff topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.get("/getGroupStuffById/:id", getGroupStuffById);

/**
 * @swagger
 * /groupStuff/updateGroupStuff/{id}:
 *   put:
 *     summary: GroupStuffni yangilash
 *     tags: [GroupStuffs]
 *     description: GroupStuffni ID bo'yicha yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: GroupStuff ID si
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
 *               group_id:
 *                 type: string
 *                 description: Yangi Guruh ID si
 *               stuff_id:
 *                 type: string
 *                 description: Yangi Xodim ID si
 *     responses:
 *       200:
 *         description: GroupStuff yangilandi
 *       404:
 *         description: GroupStuff topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.put("/updateGroupStuff/:id", validateSchema(groupStuffUpdateValidationSchema), updateGroupStuff);

/**
 * @swagger
 * /groupStuff/deleteGroupStuff/{id}:
 *   delete:
 *     summary: GroupStuffni o'chirish
 *     tags: [GroupStuffs]
 *     description: GroupStuffni ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: GroupStuff ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: GroupStuff o'chirildi
 *       404:
 *         description: GroupStuff topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
router.delete("/deleteGroupStuff/:id", deleteGroupStuff);

module.exports = { groupStuffRouter: router };