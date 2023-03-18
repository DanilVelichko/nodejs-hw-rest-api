const { User } = require("../../schemes/users/userSchema");
const { NotFound } = require("http-errors");

const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw NotFound("User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      $set: { verify: true, verificationToken: null },
    });

    await user.save();

    return res.status(200).json({ message: `Verification email: ${user.email} successful` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = verifyUser;
