const LidStatus = require("../model/lidStatusSchema");

const createLidStatus = async (req, res) => {
  try {
    const {
      status,
    } = req.body;

    const existingLidStatus = await LidStatus.findOne({ status });

    if (existingLidStatus) {
      return res.status(400).json({
        success: false,
        message: "Bu nomdagi status allaqachon mavjud.",
      });
    }

    const newLidStatus = new LidStatus({
      status,
    });
    
    await newLidStatus.save();

    return res.status(201).json({
      success: true,
      message: "LidStatus muvaffaqiyatli yaratildi.",
      innerData: newLidStatus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getLidStatuses = async (req, res) => {
  try {
    const lidStatuses = await LidStatus.find({});

    return res.status(200).json({
      success: true,
      message: "LidStatuslar ro'yxati muvaffaqiyatli olindi.",
      innerData: lidStatuses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getLidStatusById = async (req, res) => {
  try {
    const lidStatusId = req.params.id;
    const lidStatus = await LidStatus.findById(lidStatusId);

    if (!lidStatus) {
      return res.status(404).json({
        success: false,
        message: "LidStatus topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "LidStatus topildi.",
      innerData: lidStatus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updateLidStatus = async (req, res) => {
  try {
    const lidStatusId = req.params.id;

    const updatedResult = await LidStatus.findByIdAndUpdate(
      lidStatusId,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "LidStatus topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "LidStatus muvaffaqiyatli yangilandi.",
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

const deleteLidStatus = async (req, res) => {
  try {
    const lidStatusId = req.params.id;
    const deletedLidStatus = await LidStatus.findByIdAndDelete(lidStatusId);

    if (!deletedLidStatus) {
      return res.status(404).json({
        success: false,
        message: "LidStatus topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "LidStatus muvaffaqiyatli o'chirildi.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const searchLidStatus = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Qidirish muvaffaqiyatsiz bo'ldi.",
      });
    }

    const result = await LidStatus.find({
      status: { $regex: searchQuery, $options: "i" },
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
  createLidStatus,
  getLidStatuses,
  getLidStatusById,
  updateLidStatus,
  deleteLidStatus,
  searchLidStatus,
};