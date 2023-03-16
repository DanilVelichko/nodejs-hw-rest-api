const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  }, 
  token: String,
}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function (password) {
  console.log(password)
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.findById = async function (id) {
  return this.findOne({_id: id});
};

const User = mongoose.model("user", userSchema);

module.exports = {
  userSchema,
  User,
};
