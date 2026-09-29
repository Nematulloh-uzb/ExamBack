const GroupStuff = require("../model/groupStuffSchema");

const createGroupStuff = async (req, res) => {
  try {
    const { group_id, stuff_id } = req.body;

    const existingGroupStuff = await GroupStuff.findOne({ group_id, stuff_id });

    if (existingGroupStuff) {
      return res.status(400).json({
        success: false,
        message: "Bu xodim allaqachon bu guruhga ustozlikda.",
      });
    }

    const newGroupStuff = new GroupStuff({
      group_id,
      stuff_id,
    });

    await newGroupStuff.save();

    const result = await GroupStuff.findById(newGroupStuff._id).populate("group_id").populate("stuff_id", "-parol");

    return res.status(201).json({
      success: true,
      message: "GroupStuff muvaffaqiyatli yaratildi.",
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

const getGroupStuffs = async (req, res) => {
  try {
    const groupStuffs = await GroupStuff.find({}).populate("group_id").populate("stuff_id", "-parol");

    return res.status(200).json({
      success: true,
      message: "GroupStufflar ro'yxati muvaffaqiyatli olindi.",
      innerData: groupStuffs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
    });
  }
};

const getGroupStuffById = async (req, res) => {
  try {
    const groupStuffId = req.params.id;

    const groupStuff = await GroupStuff.findById(groupStuffId).populate("group_id").populate("stuff_id", "-parol");

    if (!groupStuff) {
      return res.status(404).json({
        success: false,
        message: "GroupStuff topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "GroupStuff topildi.",
      innerData: groupStuff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const deleteGroupStuff = async (req, res) => {
  try {
    const groupStuffId = req.params.id;
    const deletedGroupStuff = await GroupStuff.findByIdAndDelete(groupStuffId);

    if (!deletedGroupStuff) {
      return res.status(404).json({
        success: false,
        message: "GroupStuff topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "GroupStuff muvaffaqiyatli o'chirildi.",
      deletedGroupStuff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
    });
  }
};

const updateGroupStuff = async (req, res) => {
  try {
    const groupStuffId = req.params.id;
    const { group_id, stuff_id } = req.body;

    const updatedGroupStuff = {
      group_id,
      stuff_id,
    };

    const updatedResult = await GroupStuff.findByIdAndUpdate(
      groupStuffId,
      updatedGroupStuff,
      { new: true },
    ).populate("group_id").populate("stuff_id", "-parol");

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "GroupStuff topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "GroupStuff muvaffaqiyatli yangilandi.",
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
  createGroupStuff,
  getGroupStuffs,
  getGroupStuffById,
  deleteGroupStuff,
  updateGroupStuff,
};