const Lid = require("../model/lidSchema");

const createLid = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id,
    } = req.body;

    const existingLid = await Lid.findOne({ phone_number });
    if (existingLid) {
      return res.status(400).json({
        success: false,
        message: "Bu telefon raqam bilan lid allaqachon mavjud.",
      });
    }

    const newLid = new Lid({
      first_name,
      last_name,
      phone_number,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id,
    });

    await newLid.save();

    const result = await Lid.findById(newLid._id).populate("lid_stage_id").populate("lid_status_id").populate("cancel_reason_id").populate("trial_lesson_group_id");

    return res.status(201).json({
      success: true,
      message: "Lid muvaffaqiyatli yaratildi.",
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

const getLids = async (req, res) => {
  try {
    const lids = await Lid.find({})
      .populate("lid_stage_id").populate("lid_status_id").populate("cancel_reason_id").populate("trial_lesson_group_id");

    return res.status(200).json({
      success: true,
      message: "Lidlar ro'yxati muvaffaqiyatli olindi.",
      innerData: lids,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getLidById = async (req, res) => {
  try {
    const lidId = req.params.id;
    const lid = await Lid.findById(lidId).populate("lid_stage_id").populate("lid_status_id").populate("cancel_reason_id").populate("trial_lesson_group_id");

    if (!lid) {
      return res.status(404).json({
        success: false,
        message: "Lid topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lid topildi.",
      innerData: lid,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updateLid = async (req, res) => {
  try {
    const lidId = req.params.id;
    const {
      first_name,
      last_name,
      phone_number,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id,
    } = req.body;

    const updatedLid = {
      first_name,
      last_name,
      phone_number,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id,
    };

    const updatedResult = await Lid.findByIdAndUpdate(lidId, updatedLid, {
      new: true,
    }).populate("lid_stage_id").populate("lid_status_id").populate("cancel_reason_id").populate("trial_lesson_group_id");

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "Lid topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lid muvaffaqiyatli yangilandi.",
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

const deleteLid = async (req, res) => {
  try {
    const lidId = req.params.id;
    const deletedLid = await Lid.findByIdAndDelete(lidId);

    if (!deletedLid) {
      return res.status(404).json({
        success: false,
        message: "Lid topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lid muvaffaqiyatli o'chirildi.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const searchLid = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Qidirish muvaffaqiyatsiz bo'ldi.",
      });
    }

    const result = await Lid.find({
      $or: [
        { first_name: { $regex: searchQuery, $options: "i" } },
        { last_name: { $regex: searchQuery, $options: "i" } },
        { phone_number: { $regex: searchQuery, $options: "i" } },
      ],
    }).populate("lid_stage_id").populate("lid_status_id").populate("cancel_reason_id").populate("trial_lesson_group_id");

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
  createLid,
  getLids,
  getLidById,
  updateLid,
  deleteLid,
  searchLid,
};