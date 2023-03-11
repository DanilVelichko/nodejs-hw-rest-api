const { User } = require("../../schemes/users/userSchema");

const validSubscriptions = ["starter", "pro", "business"];

const updateUser = async (req, res) => {
  try {
    const { email, subscription } = req.body;
    if (!validSubscriptions.includes(subscription)) {
      return res.status(400).json({ message: "Invalid subscription type" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { email, subscription },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    return res.status(200).json({ updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = updateUser;
