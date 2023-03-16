const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: process.env.SENDGRID_VERIFIED_SENDER };
    // eslint-disable-next-line no-useless-catch
    try {
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = sendEmail;