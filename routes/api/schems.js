const mongoose = require("mongoose"); // add mongoose
const { Schema } = mongoose; // add Schema

// Модель контакту
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("contacts", contactSchema);

module.exports = {
    contactSchema,
    Contact,
}