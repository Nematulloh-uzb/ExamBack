const Stage = require("../model/stageSchema");

const createStage = async (req, res) => {
  try {
    const { name } = req.body;

    const existingStage = await Stage.findOne({ name });
    if (existingStage) {
      return res.status(400).json({
        success: false,
        message: "Bu nomdagi bosqich allaqachon mavjud.",
      });
    }

    const newStage = new Stage({ name });
    await newStage.save();

    return res.status(201).json({
      success: true,
      message: "Stage muvaffaqiyatli yaratildi.",
      innerData: newStage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getStages = async (req, res) => {
  try {
    const stages = await Stage.find({});

    return res.status(200).json({
      success: true,
      message: "Stagelar ro'yxati muvaffaqiyatli olindi.",
      innerData: stages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getStageById = async (req, res) => {
  try {
    const stageId = req.params.id;
    const stage = await Stage.findById(stageId);

    if (!stage) {
      return res.status(404).json({
        success: false,
        message: "Stage topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stage topildi.",
      innerData: stage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updateStage = async (req, res) => {
  try {
    const stageId = req.params.id;

    const {
      name,
    } = req.body;

    const updatedStage = {
      name,
    };

    const updatedResult = await Stage.findByIdAndUpdate(stageId, updatedStage, {
      new: true,
    });

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "Stage topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stage muvaffaqiyatli yangilandi.",
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

const deleteStage = async (req, res) => {
  try {
    const stageId = req.params.id;
    const deletedStage = await Stage.findByIdAndDelete(stageId);

    if (!deletedStage) {
      return res.status(404).json({
        success: false,
        message: "Stage topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stage muvaffaqiyatli o'chirildi.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const searchStage = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Qidirish muvaffaqiyatsiz bo'ldi.",
      });
    }

    const result = await Stage.find({
      name: { $regex: searchQuery, $options: "i" },
    });

    return res.status(200).json({
      success: true,
      message: "Qidiruv natijalari muvaffaqiyatli olindi.",
      innerData: result,
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
  createStage,
  getStages,
  getStageById,
  updateStage,
  deleteStage,
  searchStage,
};