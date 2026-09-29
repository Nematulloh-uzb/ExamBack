const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    lid_id: { type: Schema.Types.ObjectId, ref: "Lid", required: true },
    first_name: { type: String, trim: true, required: true },
    last_name: { type: String, trim: true, required: true },
    phone_number: { type: String, trim: true, required: true },
    birthday: { type: Date },
    gender: { type: String, enum: ["male", "female"], default: "male" },
  },
  { timestamps: true }
);

const Student = model("Student", studentSchema);
module.exports = Student;