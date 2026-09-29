const { Schema, model } = require("mongoose");

const groupStuffSchema = new Schema(
  {
    stuff_id: { type: Schema.Types.ObjectId, ref: "Stuff" },
    group_id: { type: Schema.Types.ObjectId, ref: "Group" }
  },
);

const groupStuff = model("groupStuff", groupStuffSchema);
module.exports = groupStuff;