const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, SENDGRID_VERIFIED_SENDER } =
  require("dotenv").config().parsed;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: SENDGRID_VERIFIED_SENDER };
  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send(email);
    console.log("Email sent to: ", email.to)
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
