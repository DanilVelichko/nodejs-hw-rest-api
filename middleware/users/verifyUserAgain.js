const { User } = require("../../schemes/users/userSchema");
const sendEmail = require("../../helpers/sendEmail.js");
const { emailVerify } = require("../../models/email/emailsTypes.js");

const verifyUserAgain = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing required field email" });
    }
    const user = await User.findOne({ email });
 
    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }
 
    const mailFull = emailVerify(email, user.verificationToken);

    await sendEmail(mailFull);
    return res
      .status(200)
      .json({ message: "Verification letter has been sent successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = verifyUserAgain;
