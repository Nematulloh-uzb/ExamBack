const { Schema, model } = require("mongoose");

const branchSchema = new Schema(
  {
    name: { type: String, trim: true, default: "" },
    address: { type: String, default: "" },
    call_number: { type: String, default: "" },
  },
)

const Branch = model("Branch", branchSchema);
module.exports = Branch;