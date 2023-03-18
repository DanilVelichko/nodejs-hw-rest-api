const { User } = require("../../schemes/users/userSchema");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../helpers/sendEmail.js");
const { emailVerify } = require("../../models/email/emailsTypes.js");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await checkExistingEmail(res, email, User);

    const verificationToken = uuidv4();

    await saltAndSavePassword(res, email, password, User, verificationToken);

    const mail = emailVerify(email, verificationToken);

    await sendEmail(mail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const checkExistingEmail = async (res, email, User) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new Conflict(`Email ${email} in use`);
  }
};

const saltAndSavePassword = async (
  res,
  email,
  password,
  User,
  verificationToken
) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
  const user = new User({
    email: email,
    password: hashedPassword,
    subscription: "starter",
    avatarURL: avatarURL,
    verificationToken: verificationToken,
  });
  await user.save();

  res.status(201).json({ user });
};

module.exports = registerUser;
