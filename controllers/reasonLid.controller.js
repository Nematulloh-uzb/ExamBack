const ReasonLid = require("../model/reasonLidSchema");

const createReasonLid = async (req, res) => {
  try {
    const {
      reason_lid
    } = req.body;

    const existingReasonLid = await ReasonLid.findOne({ reason_lid });
    if (existingReasonLid) {
      return res.status(400).json({
        success: false,
        message: "Bu sabab allaqachon mavjud.",
      });
    }

    const newReasonLid = new ReasonLid({
      reason_lid
    });
    await newReasonLid.save();

    return res.status(201).json({
      success: true,
      message: "ReasonLid muvaffaqiyatli yaratildi.",
      innerData: newReasonLid,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getReasonLids = async (req, res) => {
  try {
    const reasonLids = await ReasonLid.find({});

    return res.status(200).json({
      success: true,
      message: "ReasonLidlar ro'yxati muvaffaqiyatli olindi.",
      innerData: reasonLids,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getReasonLidById = async (req, res) => {
  try {
    const reasonLidId = req.params.id;
    const reasonLid = await ReasonLid.findById(reasonLidId);

    if (!reasonLid) {
      return res.status(404).json({
        success: false,
        message: "ReasonLid topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ReasonLid topildi.",
      innerData: reasonLid,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updateReasonLid = async (req, res) => {
  try {
    const reasonLidId = req.params.id;

    const updatedResult = await ReasonLid.findByIdAndUpdate(
      reasonLidId,
      { reason_lid: req.body.reason_lid },
      { new: true }
    );

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "ReasonLid topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ReasonLid muvaffaqiyatli yangilandi.",
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

const deleteReasonLid = async (req, res) => {
  try {
    const reasonLidId = req.params.id;
    const deletedReasonLid = await ReasonLid.findByIdAndDelete(reasonLidId);

    if (!deletedReasonLid) {
      return res.status(404).json({
        success: false,
        message: "ReasonLid topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ReasonLid muvaffaqiyatli o'chirildi.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const searchReasonLid = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Qidirish muvaffaqiyatsiz bo'ldi.",
      });
    }

    const result = await ReasonLid.find({
      reason_lid: { $regex: searchQuery, $options: "i" },
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
  createReasonLid,
  getReasonLids,
  getReasonLidById,
  updateReasonLid,
  deleteReasonLid,
  searchReasonLid,
};