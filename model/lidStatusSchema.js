const { Schema, model } = require("mongoose");

const lidStatusSchema = new Schema(
  {
    status: { type: String, trim: true, required: true, unique: true },
  },
);

const LidStatus = model("LidStatus", lidStatusSchema);
module.exports = LidStatus;