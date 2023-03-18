const { User } = require("../../schemes/users/userSchema");
const { Unauthorized } = require("http-errors");

const logout = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    // If user not found, return 401 Unauthorized error
    if (!user) {
      throw new Unauthorized("Not authorized");
    }

    // Delete the user token
    user.token = null;
    await user.save();

    // Return 204 No Content response
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = logout;
