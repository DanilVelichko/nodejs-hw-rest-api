const mongoose = require("mongoose"); 

const { Schema } = mongoose; 

const contactSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",

  },
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
},  { versionKey: false, timestamps: true });

const Contact = mongoose.model("contacts", contactSchema);

module.exports = {
    contactSchema,
    Contact,
}