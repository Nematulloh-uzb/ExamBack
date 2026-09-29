const StudentLesson = require("../model/studentLessonSchema");

const createStudentLesson = async (req, res) => {
  try {
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

    const existing = await StudentLesson.findOne({ lesson_id, student_id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Bu talaba bu darsga allaqachon belgilangan.",
      });
    }

    const newStudentLesson = new StudentLesson({
      lesson_id, student_id, is_there, reason, be_paid,
    });
    await newStudentLesson.save();

    const result = await StudentLesson.findById(newStudentLesson._id)
      .populate("lesson_id")
      .populate("student_id");

    return res.status(201).json({
      success: true,
      message: "StudentLesson muvaffaqiyatli yaratildi.",
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

const getStudentLessons = async (req, res) => {
  try {
    const items = await StudentLesson.find({})
      .populate("lesson_id")
      .populate("student_id");

    return res.status(200).json({
      success: true,
      message: "StudentLessonlar ro'yxati muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getStudentLessonById = async (req, res) => {
  try {
    const item = await StudentLesson.findById(req.params.id)
      .populate("lesson_id")
      .populate("student_id");

    if (!item) {
      return res.status(404).json({ success: false, message: "StudentLesson topilmadi." });
    }

    return res.status(200).json({
      success: true,
      message: "StudentLesson topildi.",
      innerData: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updateStudentLesson = async (req, res) => {
  try {
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;
    const updatedData = { lesson_id, student_id, is_there, reason, be_paid };

    const updatedResult = await StudentLesson.findByIdAndUpdate(
      req.params.id, updatedData, { new: true }
    )
      .populate("lesson_id")
      .populate("student_id");

    if (!updatedResult) {
      return res.status(404).json({ success: false, message: "StudentLesson topilmadi." });
    }

    return res.status(200).json({
      success: true,
      message: "StudentLesson muvaffaqiyatli yangilandi.",
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

const deleteStudentLesson = async (req, res) => {
  try {
    const deleted = await StudentLesson.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "StudentLesson topilmadi." });
    }
    return res.status(200).json({
      success: true,
      message: "StudentLesson muvaffaqiyatli o'chirildi.",
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
  createStudentLesson,
  getStudentLessons,
  getStudentLessonById,
  updateStudentLesson,
  deleteStudentLesson,
};