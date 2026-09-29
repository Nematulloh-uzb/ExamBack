const { Schema, model } = require("mongoose");

const lessonSchema = new Schema(
  {
    lesson_theme: { type: String, trim: true, required: true },
    lesson_number: { type: Number, required: true },
    group_id: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    lesson_date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Lesson = model("Lesson", lessonSchema);
module.exports = Lesson;