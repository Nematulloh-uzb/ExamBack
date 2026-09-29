const { Schema, model } = require("mongoose");

const stuff_roleSchema = new Schema(
  {
    stuff_id: { type: Schema.Types.ObjectId, ref: "Stuff" },
    role_id: { type: Schema.Types.ObjectId, ref: "Role" }
  },
);

const Stuff_Role = model("Stuff_Role", stuff_roleSchema);
module.exports = Stuff_Role;