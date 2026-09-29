const Group = require("../model/groupSchema");

const createGroup = async (req, res) => {
  try {
    const {
      group_name,
      lesson_start_time,
      lesson_continuous,
      lesson_week_day,
      group_stage_id,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active,
    } = req.body;

    const existingGroup = await Group.findOne({ group_name });

    if (existingGroup) {
      return res.status(400).json({
        success: false,
        message: "Bu nomdagi guruh allaqachon mavjud.",
      });
    }

    const newGroup = new Group({
      group_name,
      lesson_start_time,
      lesson_continuous,
      lesson_week_day,
      group_stage_id,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active,
    });

    await newGroup.save();

    const result = await Group.findById(newGroup._id).populate("branch_id").populate("group_stage_id");

    return res.status(201).json({
      success: true,
      message: "Group muvaffaqiyatli yaratildi.",
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

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("branch_id").populate("group_stage_id");

    return res.status(200).json({
      success: true,
      message: "Grouplar muvaffaqiyatli olindi.",
      innerData: groups,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getGroupById = async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await Group.findById(groupId).populate("branch_id").populate("group_stage_id");

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Group muvaffaqiyatli olindi.",
      innerData: group,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({
        success: false,
        message: "Group topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Group muvaffaqiyatli o'chirildi.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updateGroup = async (req, res) => {
  try {
    const groupId = req.params.id;

    const {
      group_name,
      lesson_start_time,
      lesson_continuous,
      lesson_week_day,
      group_stage_id,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active,
    } = req.body;

    const updatedGroup = {
      group_name,
      lesson_start_time,
      lesson_continuous,
      lesson_week_day,
      group_stage_id,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active,
    };

    const updatedResult = await Group.findByIdAndUpdate(groupId, updatedGroup, {
      new: true,
    }).populate("branch_id").populate("group_stage_id");

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "Group topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Group muvaffaqiyatli yangilandi.",
      updatedGroup: updatedResult,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const searchGroup = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Qidirish muvaffaqiyatsiz bo'ldi.",
      });
    }

    const groups = await Group.find({
      $or: [
        { group_name: { $regex: searchQuery, $options: "i" } },
        { lesson_week_day: { $regex: searchQuery, $options: "i" } },
        { room_number: { $regex: searchQuery, $options: "i" } },
        { lesson_start_time: { $regex: searchQuery, $options: "i" } },
      ],
    }).populate("branch_id").populate("group_stage_id");

    return res.status(200).json({
      success: true,
      message: "Grouplar muvaffaqiyatli topildi.",
      innerData: groups,
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
  createGroup,
  getGroups,
  getGroupById,
  deleteGroup,
  updateGroup,
  searchGroup,
};