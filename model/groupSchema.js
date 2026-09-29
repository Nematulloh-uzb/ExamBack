const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    group_name: { type: String, required: true, trim: true, default: "" },
    lesson_start_time: { type: String, required: true, default: "" },
    lesson_continuous: { type: String, required: true, default: "" },
    lesson_week_day: { type: String, required: true, default: "" },
    room_number: { type: String, required: true, default: "" },
    room_floor: { type: Number, required: true, default: 0 },
    lessons_quant: { type: Number, required: true, default: 0 },
    is_active: { type: Boolean, default: true },
    group_stage_id: { type: Schema.Types.ObjectId, ref: "Stage" },
    branch_id: { type: Schema.Types.ObjectId, ref: "Branch" },
  }
);

const Group = model("Group", groupSchema);
module.exports = Group;