const { deleteImgCloudinary } = require('../../middleware/files.middleware');
const randomNumber = require('../../utils/randomNumber');
const nodemailer = require('nodemailer');
const User = require('../models/User.model');
const sendEmail = require('../../utils/emailSender');
const { getSentEmail, setSentEmail } = require('../../state/state.data');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/token');
const setError = require('../../helpers/setError');

//TODO---------REGISTRATION LARGO-----------------------------------

const userRegistration = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    await User.syncIndexes();
    let confirmationEmailCode = randomNumber();
    const { name, userEmail } = req.body;
    console.log(userEmail);

    const doesUserExist = await User.findOne(
      { name: req.body.name },
      { userEmail: req.body.userEmail }
    );
    if (!doesUserExist) {
      const newUser = new User({ ...req.body, confirmationEmailCode });
      req.file
        ? (newUser.image = req.file.path)
        : (newUser.image = 'https://pic.onlinewebfonts.com/svg/img_181369.png'); //puede que me de error
      try {
        const savedUser = await newUser.save();
        if (savedUser) {
          //si saved user existe... no tenemos un else porque si no existiese, lo recogeria ek try catch
          const EnvEmail = process.env.EMAIL;
          const PASSWORD = process.env.PASSWORD;
          console.log(userEmail);

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: EnvEmail,
              pass: PASSWORD,
            },
          });

          const mailOptions = {
            from: EnvEmail,
            to: userEmail,
            subject: 'Confirmation Code',
            text: `Your code is ${confirmationEmailCode}, thank you for trusting us ${name}`,
          };
          console.log(userEmail, 'Antes de .sendmail');
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return res.status(404).json({
                user: savedUser,
                confirmationEmailCode: 'Error, resend the confirmation code',
              });
            } else {
              console.log(`Email sent to ${userEmail} ` + info.response);
              return res.status(200).json({
                user: savedUser,
                confirmationEmailCode,
              });
            }
          });
        }
      } catch (error) {
        req.file && deleteImgCloudinary(catchImage);
        res
          .status(404)
          .json({ error: 'Error in the save', message: error.message });
      }
    } else {
      req.file && deleteImgCloudinary(catchImage); //puede que me de error
      res.status(409).json('User already in database');
    }
  } catch (error) {
    req.file && deleteImgCloudinary(catchImage);
    return (
      res
        .status(404)
        .json({ error: 'General catch error', message: error.message }) &&
      next(error)
    );
  }
};

//todo------------- REGISTRATION CON ESTADO-------------

const stateRegister = async (req, res, next) => {
  let catchImage = req.file?.path;

  try {
    await User.syncIndexes();
    let confirmationEmailCode = randomNumber();
    const { userEmail, name } = req.body;

    const doesUserExist = await User.findOne(
      { userEmail: req.body.userEmail },
      { name: req.body.name }
    );

    if (!doesUserExist) {
      const newUser = new User({ ...req.body, confirmationEmailCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = 'https://pic.onlinewebfonts.com/svg/img_181369.png';
      }

      try {
        const savedUser = await newUser.save();

        if (savedUser) {
          //aqui no hay else porque si no lo encuentra es porque no se ha guardado, y saltara en el try catch
          sendEmail(userEmail, name, confirmationEmailCode); //PRIMERO enviamos el email

          setTimeout(() => {
            //dejamos esperar un poco hasta que  send email gestione sus asincronias, y luego checkeamos el estado de getSentEmail
            console.log(getSentEmail());
            if (getSentEmail()) {
              setSentEmail(false);
              res.status(200).json({ user: savedUser, confirmationEmailCode });
            } else {
              setSentEmail(false);
              return res.status(404).json({
                user: savedUser,
                confirmationEmailCode:
                  'Error. Please resend confirmation code.',
              });
            }
          }, 2000);
        }
      } catch (error) {
        req.file && deleteImgCloudinary(catchImage);
        return res.status(404).json({
          error: 'Error saving the User through states',
          message: error.message,
        });
      }
    } else {
      //si no ponemos las llaves seria un else if jajaj
      req.file && deleteImgCloudinary(catchImage); //!PUEDE DAR ERROR??
      return res.status(409).json(`The user is already in our database.`);
    }
  } catch (error) {
    req.file && deleteImgCloudinary(catchImage);
    return (
      res.status(404).json({
        error: 'Error in registration catch',
        message: error.message,
      }) && next(error)
    );
  }
};

//todo----------------REGISTRATION WITH REDIRECTION---------------------

const redirectRegister = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    await User.syncIndexes();
    let confirmationEmailCode = randomNumber();
    const doesUserExist = await User.findOne(
      { name: req.body.name },
      { userEmail: req.body.userEmail }
    );
    if (!doesUserExist) {
      const newUser = new User({ ...req.body, confirmationEmailCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = 'https://pic.onlinewebfonts.com/svg/img_181369.png';
      }
      try {
        const savedUser = await newUser.save();
        if (savedUser) {
          return res.redirect(
            307,
            `http://localhost:8081/api/v1/users/register/sendMail/${savedUser._id}`
          );
        }
      } catch (error) {
        req.file && deleteImgCloudinary(catchImage);
        return res.status(404).json({
          error: 'Error in save catch',
          message: error.message,
        });
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImage);
      return res.status(409).json('This user already exists.');
    }
  } catch (error) {
    req.file && deleteImgCloudinary(catchImage);
    return (
      res.status(404).json({
        error: 'Redirect catch error',
        message: error.message,
      }) && next(error)
    );
  }
};

//TODO---------------------------LOGIN----------------------------------
const userLogin = async (req, res, next) => {
  try {
    const { password, userEmail } = req.body;
    const userFromDB = await User.findOne({ userEmail });

    if (userFromDB) {
      if (bcrypt.compareSync(password, userFromDB.password)) {
        const token = generateToken(userFromDB._id, userEmail); //token
        return res.status(200).json({
          user: userFromDB,
          token: token,
          state: 'You are logged in.',
        });
      } else {
        return res.status(404).json('Password is incorrect.'); //no concuerdan
      }
    } else {
      return res.status(404).json('User not found.');
    }
  } catch (error) {
    return next(error);
  }
};

//TODO---------------------------RESEND CODE----------------------------------
const resendCode = async (req, res, next) => {
  //ESTA ES LA UNICA QUE ES ASINCRONA DE MANDAR UN CODIGO
  try {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });
    const doesUserExist = await User.findOne({ userEmail: req.body.userEmail });
    if (doesUserExist) {
      const mailOptions = {
        from: email,
        to: req.body.userEmail,
        subject: 'Confirmation code',
        text: `Sorry about that! Your confirmation code is ${doesUserExist.confirmationEmailCode}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(404).json({ resendDone: false });
        } else {
          console.log(`Email sent to ${req.body.userEmail}, ${info.response}`);
          return res.status(200).json({ resendDone: true });
        }
      });
    } else {
      return res.status(404).json('User does not exist.');
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error in resend code catch.'));
  }
};

//TODO--------------------USER CHECK--------------------------
const newUserCheck = async (req, res, next) => {
  try {
    const { userEmail, confirmationEmailCode } = req.body;
    const doesUserExist = await User.findOne({ userEmail });
    console.log(confirmationEmailCode);
    console.log(doesUserExist.confirmationEmailCode);
    if (!doesUserExist) {
      return res.status(404).json('User not found.');
    } else {
      if (doesUserExist.confirmationEmailCode == confirmationEmailCode) {
        try {
          console.log('Codigo ok');

          await doesUserExist.updateOne({ isVerified: true });
          const updatedUser = await User.findOne({ userEmail });
          return res.status(200).json({
            testCheckUser: updatedUser.isVerified == true ? true : false,
          });
        } catch (error) {
          return res.status(404).json('Error in updating validation.');
        }
      } else {
        console.log('Borrado');
        await User.findByIdAndDelete(doesUserExist._id);
        deleteImgCloudinary(doesUserExist.image);
        return res.status(404).json({
          doesUserExist,
          check: false,
          delete: (await User.findById(doesUserExist._id))
            ? 'Error deleting user.'
            : 'User deleted for security. Please submit again.',
        });
      }
    }
  } catch (error) {
    return next(
      setError(500, error.message || 'Error in user check try catch')
    );
  }
};

//?----------EXPORTS-----------------
module.exports = {
  userRegistration,
  stateRegister,
  redirectRegister,
  userLogin,
  resendCode,
  newUserCheck,
};
