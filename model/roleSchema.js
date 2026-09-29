const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
  }
);

const Role = model("Role", roleSchema);
module.exports = Role;