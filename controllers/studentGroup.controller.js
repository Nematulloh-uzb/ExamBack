const StudentGroup = require("../model/studentGroupSchema");

const createStudentGroup = async (req, res) => {
  try {
    const { student_id, group_id } = req.body;

    const existingStudentGroup = await StudentGroup.findOne({ student_id, group_id });
    if (existingStudentGroup) {
      return res.status(400).json({
        success: false,
        message: "Bu talaba allaqachon bu guruhga qo'shilgan.",
      });
    }

    const newStudentGroup = new StudentGroup({ student_id, group_id });
    await newStudentGroup.save();

    const result = await StudentGroup.findById(newStudentGroup._id)
      .populate("student_id")
      .populate("group_id");

    return res.status(201).json({
      success: true,
      message: "StudentGroup muvaffaqiyatli yaratildi.",
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

const getStudentGroups = async (req, res) => {
  try {
    const studentGroups = await StudentGroup.find({})
      .populate("student_id")
      .populate("group_id");

    return res.status(200).json({
      success: true,
      message: "StudentGrouplar ro'yxati muvaffaqiyatli olindi.",
      innerData: studentGroups,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getStudentGroupById = async (req, res) => {
  try {
    const studentGroupId = req.params.id;
    const studentGroup = await StudentGroup.findById(studentGroupId)
      .populate("student_id")
      .populate("group_id");

    if (!studentGroup) {
      return res.status(404).json({
        success: false,
        message: "StudentGroup topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "StudentGroup topildi.",
      innerData: studentGroup,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updateStudentGroup = async (req, res) => {
  try {
    const studentGroupId = req.params.id;
    const { student_id, group_id } = req.body;

    const updatedStudentGroup = { student_id, group_id };

    const updatedResult = await StudentGroup.findByIdAndUpdate(
      studentGroupId,
      updatedStudentGroup,
      { new: true }
    )
      .populate("student_id")
      .populate("group_id");

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "StudentGroup topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "StudentGroup muvaffaqiyatli yangilandi.",
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

const deleteStudentGroup = async (req, res) => {
  try {
    const studentGroupId = req.params.id;
    const deletedStudentGroup = await StudentGroup.findByIdAndDelete(studentGroupId);

    if (!deletedStudentGroup) {
      return res.status(404).json({
        success: false,
        message: "StudentGroup topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "StudentGroup muvaffaqiyatli o'chirildi.",
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
  createStudentGroup,
  getStudentGroups,
  getStudentGroupById,
  updateStudentGroup,
  deleteStudentGroup,
};