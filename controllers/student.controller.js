const Student = require("../model/studentSchema");

const createStudent = async (req, res) => {
  try {
    const { lid_id,
      first_name,
      last_name,
      phone_number,
      birthday,
      gender,
    } = req.body;

    const existingStudent = await Student.findOne({ lid_id });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Bu student allaqachon mavjud.",
      });
    }

    const newStudent = new Student({
      lid_id,
      first_name,
      last_name,
      phone_number,
      birthday,
      gender,
    });

    await newStudent.save();

    const result = await Student.findById(newStudent._id).populate("lid_id");

    return res.status(201).json({
      success: true,
      message: "Student muvaffaqiyatli yaratildi.",
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

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({}).populate("lid_id");

    return res.status(200).json({
      success: true,
      message: "Studentlar ro'yxati muvaffaqiyatli olindi.",
      innerData: students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId).populate("lid_id");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student topildi.",
      innerData: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { lid_id,
      first_name,
      last_name,
      phone_number,
      birthday,
      gender,
    } = req.body;

    const updatedStudent = {
      lid_id,
      first_name,
      last_name,
      phone_number,
      birthday,
      gender,
    };

    const updatedResult = await Student.findByIdAndUpdate(studentId, updatedStudent, {
      new: true,
    }).populate("lid_id");

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "Student topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student muvaffaqiyatli yangilandi.",
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

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student topilmadi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student muvaffaqiyatli o'chirildi.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const searchStudent = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Qidirish muvaffaqiyatsiz bo'ldi.",
      });
    }

    const result = await Student.find({
      $or: [
        { first_name: { $regex: searchQuery, $options: "i" } },
        { last_name: { $regex: searchQuery, $options: "i" } },
        { phone_number: { $regex: searchQuery, $options: "i" } },
      ],
    }).populate("lid_id");

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
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudent,
};