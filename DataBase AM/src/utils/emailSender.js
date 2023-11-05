const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const { setSentEmail } = require('../state/state.data');
//! ESTE EMAILSENDER ES PARA EL REGISTER CON ESTADOS

const sendEmail = async (userEmail, name, confirmationEmailCode) => {
  setSentEmail(false);

  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailOptions = {
    from: email,
    to: userEmail,
    subject: 'Confirmation Code',
    text: `Hi, your confirmation code is ${confirmationEmailCode}, thank you for your patience ${name}!`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      setSentEmail(false);
    } else {
      console.log(`Email sent succesfully. ${info.response}`);
      setSentEmail(true);
    }
    //getSentEmail devuelve true aqui correctamente
  });
};

module.exports = sendEmail;
