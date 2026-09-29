const { Schema, model } = require("mongoose");

const stageSchema = new Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
  },
);

const Stage = model("Stage", stageSchema);
module.exports = Stage;