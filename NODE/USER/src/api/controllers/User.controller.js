const { deleteImgCloudinary } = require('../../middleware/files.middleware');
const randomNumber = require('../../utils/randomNumber');
const nodemailer = require('nodemailer');
const User = require('../models/User.model');

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

//?----------EXPORTS-----------------
module.exports = { userRegistration };
