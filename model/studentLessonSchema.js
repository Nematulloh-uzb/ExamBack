const { Schema, model } = require("mongoose");

const studentLessonSchema = new Schema(
  {
    lesson_id: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    is_there: { type: Boolean, default: false },
    reason: { type: String, trim: true, default: "" },
    be_paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const StudentLesson = model("StudentLesson", studentLessonSchema);
module.exports = StudentLesson;