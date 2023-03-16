const { User } = require("../../schemes/users/userSchema");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.verify || !user.comparePassword(password)) {
      throw new Unauthorized(
        `Email ${email} or password ${password} is wrong. Or check your email verification.`
      );
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_LIFETIME,
    });

    res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = loginUser;
