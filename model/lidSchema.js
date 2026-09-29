const { Schema, model } = require("mongoose");

const lidSchema = new Schema(
  {
    first_name: { type: String, trim: true, required: true },
    last_name: { type: String, trim: true, required: true },
    phone_number: { type: String, trim: true, required: true },
    lid_stage_id: { type: Schema.Types.ObjectId, ref: "Stage" },
    test_date: { type: Date },
    trial_lesson_date: { type: Date },
    trial_lesson_time: { type: String, trim: true },
    trial_lesson_group_id: { type: Schema.Types.ObjectId, ref: "Group", default: null },
    lid_status_id: { type: Schema.Types.ObjectId, ref: "LidStatus" },
    cancel_reason_id: { type: Schema.Types.ObjectId, ref: "ReasonLid" },
  },
);

const Lid = model("Lid", lidSchema);
module.exports = Lid;