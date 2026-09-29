const { Schema, model } = require("mongoose");

const stuffSchema = new Schema(
  {
    first_name: { type: String, trim: true, default: "" },
    last_name: { type: String, trim: true, default: "" },
    phone_number: { type: String, default: "" },
    login: { type: String, trim: true, unique: true, default: "" },
    parol: { type: String, required: true },
    is_active: { type: Boolean, default: false },
  },
);

const Stuff = model("Stuff", stuffSchema);
module.exports = Stuff;