const { PORT } = require("dotenv").config().parsed;

function emailVerify(email, verificationToken) {
  return {
    to: email,
    subject: "Email verification",
    html: `<html>
            <head>
              <meta charset="UTF-8">
              <title>Email Verification</title>
              <style>
              
                body {
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.5;
                  color: #333;
                }
                h1 {
                  color: #007bff;
                }
                p {
                  margin-bottom: 1rem;
                }
                a {
                  color: #007bff;
                }
              </style>
            </head>
            <body>
              <h1>Hello, dear user!</h1>
              <p>We are pleased to welcome you to our site. To start using our site, please verify your email.</p>
              <p>Click the button below to verify your email: <p>${email}</p></p>
              <a href="http://localhost:${PORT}/api/users/verify/${verificationToken}" target="_blank" style="display: inline-block; background-color: #007bff; color: #fff; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px;">Verify Email</a>
              
            </body>
          </html>`,
  };
}

module.exports = {
  emailVerify,
};
