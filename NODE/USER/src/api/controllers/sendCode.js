const User = require('../models/User.model');
const nodemailer = require('nodemailer');
//! ESTE SENDCODE ES PARA EL REGISTER CON REDIRECT, ES EL CONTROLADOR DEL ENRUTADO. PEDRO LO TIENE EN CONTROLADORES, EN EL MISMO ARCHIVO

const sendCode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);

    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailEnv,
        pass: password,
      },
    });

    const mailOptions = {
      from: emailEnv,
      to: userDB.userEmail,
      subject: 'Confirmation code',
      text: `tu codigo es ${userDB.confirmationEmailCode}, gracias por confiar en nosotros ${userDB.name}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          user: userDB,
          confirmationCode: 'error, resend code',
        });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({
          user: userDB,
          confirmationEmailCode: userDB.confirmationEmailCode,
        });
      }
    });
  } catch (error) {
    return (
      res.status(404).json({
        error: 'error catch general',
        message: error.message,
      }) && next(error)
    );
  }
};

module.exports = sendCode;
