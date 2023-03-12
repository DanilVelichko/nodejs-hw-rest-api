const { User } = require("../../schemes/users/userSchema");
const { Conflict, InternalServerError } = require("http-errors");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await checkExistingEmail(res, email, User);

    await saltAndSavePassword(res, email, password, User);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Server error").json({ message: error.message });
  }
};

const checkExistingEmail = async (res, email, User) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new Conflict(`Email ${email} in use`); 
  }
};

const saltAndSavePassword = async (res, email, password, User) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    email: email,
    password: hashedPassword,
    subscription: "starter",
  });
  await user.save();

  res.status(201).json({user});
};

module.exports = registerUser;
