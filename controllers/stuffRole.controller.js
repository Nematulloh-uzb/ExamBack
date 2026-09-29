const StuffRole = require("../model/stuffRoleSchema");

const createStuffRole = async (req, res) => {
  try {
    const {
      stuff_id,
      role_id,
    } = req.body;

    const existingStuffRole = await StuffRole.findOne({ stuff_id, role_id });

    if (existingStuffRole) {
      return res.status(400).json({
        success: false,
        message: "Bu stuff va role allaqachon bog'langan.",
      });
    }

    const newStuffRole = new StuffRole({
      stuff_id,
      role_id,
    });

    await newStuffRole.save();

    const result = await StuffRole.findById(newStuffRole._id).populate("stuff_id", "-parol").populate("role_id");
    return res.status(201).json({
      success: true,
      message: "StuffRole muvaffaqiyatli yaratildi.",
      innerData: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
    });
  }
};

const getStuffRoles = async (req, res) => {
  try {
    const stuffRoles = await StuffRole.find({})
      .populate("stuff_id", "-parol")
      .populate("role_id");

    res.json({
      success: true,
      message: "StuffRolelar ro'yxati muvaffaqiyatli olindi.",
      innerData: stuffRoles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
    });
  }
};

const getStuffRoleById = async (req, res) => {
  try {
    const stuffRoleId = req.params.id;

    const stuffRole = await StuffRole.findById(stuffRoleId)
      .populate("stuff_id", "-parol")
      .populate("role_id");

    if (!stuffRole) {
      return res.status(404).json({
        success: false,
        message: "StuffRole topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "StuffRole topildi.",
      innerData: stuffRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const deleteStuffRole = async (req, res) => {
  try {
    const stuffRoleId = req.params.id;
    const deletedStuffRole = await StuffRole.findByIdAndDelete(stuffRoleId);

    if (!deletedStuffRole) {
      return res.status(404).json({
        success: false,
        message: "StuffRole topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "StuffRole muvaffaqiyatli o'chirildi.",
      innerData: deletedStuffRole,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updateStuffRole = async (req, res) => {
  try {
    const stuffRoleId = req.params.id;

    const {
      stuff_id,
      role_id,
    } = req.body;

    const updatedStuffRole = {
      stuff_id,
      role_id,
    };

    const updatedResult = await StuffRole.findByIdAndUpdate(stuffRoleId, updatedStuffRole, {
      new: true,
    }).populate("stuff_id", "-parol").populate("role_id");

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "StuffRole topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "StuffRole muvaffaqiyatli yangilandi.",
      innerData: updatedResult,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

module.exports = {
  createStuffRole,
  getStuffRoles,
  getStuffRoleById,
  deleteStuffRole,
  updateStuffRole,
};