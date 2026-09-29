const Lesson = require("../model/lessonSchema");

const createLesson = async (req, res) => {
  try {
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

    const newLesson = new Lesson({
      lesson_theme,
      lesson_number,
      group_id,
      lesson_date,
    });

    await newLesson.save();

    const result = await Lesson.findById(newLesson._id).populate("group_id");

    return res.status(201).json({
      success: true,
      message: "Lesson muvaffaqiyatli yaratildi.",
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

const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({}).populate("group_id");

    return res.status(200).json({
      success: true,
      message: "Lessonlar ro'yxati muvaffaqiyatli olindi.",
      innerData: lessons,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lessonId = req.params.id;

    const lesson = await Lesson.findById(lessonId).populate("group_id");

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lesson topildi.",
      innerData: lesson,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updateLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

    const updatedLesson = {
      lesson_theme,
      lesson_number,
      group_id,
      lesson_date,
    };

    const updatedResult = await Lesson.findByIdAndUpdate(
      lessonId,
      updatedLesson,
      { new: true }
    ).populate("group_id");

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "Lesson topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lesson muvaffaqiyatli yangilandi.",
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

const deleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;

    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

    if (!deletedLesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lesson muvaffaqiyatli o'chirildi.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const searchLesson = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Qidirish muvaffaqiyatsiz bo'ldi.",
      });
    }

    const result = await Lesson.find({
      lesson_theme: { $regex: searchQuery, $options: "i" },
    }).populate("group_id");

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
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
  searchLesson,
};