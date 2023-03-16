function  emailVerify (email, verificationToken) {
  return {  
      to: email,
      subject: 'Email verification',
      html: `<a target='_blank' href="http://localhost:3000/api/users/verify/${verificationToken}">Verify your email: ${email} </a>`,
  }
};
    
module.exports = {
  emailVerify,
}

const email = 'test@example.com';
const verificationToken = '123456';

console.log(emailVerify(email, verificationToken));