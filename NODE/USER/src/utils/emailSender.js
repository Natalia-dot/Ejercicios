const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const { setSentEmail } = require('../state/state.data');

const sendEmail = (userEmail, name, confirmationEmailCode) => {
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

  const
};
