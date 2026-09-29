const { Schema, model } = require("mongoose");

const reasonLidSchema = new Schema(
  {
    reason_lid: { type: String, trim: true, required: true, unique: true },
  },
);

const ReasonLid = model("ReasonLid", reasonLidSchema);
module.exports = ReasonLid;