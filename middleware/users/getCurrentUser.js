const { User } = require("../../schemes/users/userSchema");

const getCurrentUser = async (req, res) => {
  try {
    const { email, subscription } = await User.findById(req.user.id);
    if (!email) {
      return res.status(401).json({ message: "Not authorized" });
    }

    return res.status(200).json({ email, subscription });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = getCurrentUser;
