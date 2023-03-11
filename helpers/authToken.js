const jwt = require("jsonwebtoken");
const { User } = require("../schemes/users/userSchema");
const { Unauthorized } = require("http-errors");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new Unauthorized("Not authorized");
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);

    if (!user) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.message === "Invalid signature") {
      err.status = 401;
    }
    next(err);
  }
};

module.exports = authenticateToken;
