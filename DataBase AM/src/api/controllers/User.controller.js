//<--IMP                                          MIDDLEWARE                                                    ->
const { deleteImgCloudinary } = require('../../middleware/files.middleware');

//<--IMP                                        UTILS / HELPERS                                                 ->
const randomNumber = require('../../utils/randomNumber');
const randomPassword = require('../../utils/randomPassword');
const enumOk = require('../../utils/enumOk');
const sendEmail = require('../../utils/emailSender');
const { generateToken } = require('../../utils/token');
const { getSentEmail, setSentEmail } = require('../../state/state.data');
const setError = require('../../helpers/setError');

//<--IMP                                           LIBRARIES                                                    ->
const validator = require('validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

//<--IMP                                             MODELS                                                     ->
const User = require('../models/User.model');

//<--SEC                                   LONG  REGISTRATION                                                   ->

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

//<--SEC                                   STATE  REGISTRATION                                                  ->

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

//<--SEC                                   REDIRECT  REGISTRATION                                                   ->

const redirectRegister = async (req, res, next) => {
  let catchImage = req.file?.path;
  console.log(catchImage);
  try {
    await User.syncIndexes();
    let confirmationEmailCode = randomNumber();
    const doesUserExist = await User.findOne(
      { name: req.body.name },
      { userEmail: req.body.userEmail }
    );
    if (!doesUserExist) {
      console.log('hola, funciono');
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
            `http://localhost:8088/api/v1/users/register/sendMail/${savedUser._id}`
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
//!--------SENDCODE DEL REDIRECT DE SENDMAIL!!!
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

//<--SEC                                         CHECK EMAIL                                                   ->

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
        //? No me deja poner un estrictamente igual
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

//<--SEC                                         RESEND EMAIL                                                   ->

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

//<--SEC                                             LOGIN                                                     ->
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

//<--SEC                                           AUTO  LOGIN                                                  ->

const autoLogin = async (req, res, next) => {
  try {
    const { userEmail, password } = req.body;
    const userFromDB = await User.findOne({ userEmail });
    if (userFromDB) {
      if (password === userFromDB.password) {
        const token = generateToken(userFromDB._id, userEmail);
        return res.status(200).json({ user: userFromDB, token: token });
      } else {
        return res
          .status(404)
          .json('Password does not match. Please try again.');
      }
    } else {
      return res.status(404).json('User does not exist.');
    }
  } catch (error) {
    return next(error);
  }
};

//<--SEC                                  PASSWORD CHANGE WHILE LOGGED OUT                                   ->

const passChangeWhileLoggedOut = async (req, res, next) => {
  try {
    const { userEmail } = req.body;
    const userFromDB = await User.findOne({ userEmail });
    if (userFromDB) {
      console.log('userFromDB antes del redirect:', userFromDB._id);
      return res.redirect(
        307,
        `http://localhost:8088/api/v1/users/sendPassword/${userFromDB._id}`
      );
    } else {
      return res.status(404).json('User does not exist.');
    }
  } catch (error) {
    return next(
      setError(500, {
        message: error.message,
        error: 'Error in password change catch while logged out.',
      })
    );
  }
};
//!REDIRECT DE SEND PASSWORD DE LA ANTERIOR!!
const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log({ id });
    const userById = await User.findById(id);
    const newPassword = randomPassword();
    console.log(newPassword);

    const envEmail = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: envEmail,
        pass: password,
      },
    });

    const mailOptions = {
      from: envEmail,
      to: userById.userEmail,
      subject: `Hi, ${userById.name}`,
      text: `Hi, here is your temporary password. Please change it after entering. ${newPassword}`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        return res.status(404).json({
          message: error,
          error: 'Mail not sent and password not changed. Please try again.',
        });
      } else {
        const newHashedPassword = bcrypt.hashSync(newPassword, 10);
        try {
          await User.findByIdAndUpdate(id, { password: newHashedPassword });
          const updatedUser = await User.findById(id);
          console.log(newHashedPassword);
          console.log(updatedUser.password);

          if (bcrypt.compareSync(newPassword, updatedUser.password)) {
            return res.status(200).json({
              message: 'Mail sent and user updated successfully.',
              info,
            });
          } else {
            return res.status(404).json({
              message:
                'Mail sent but password not changed. Please send the code again.',
            });
          }
        } catch (error) {
          return res.status(404).json('Error in password update');
        }
      }
    });
  } catch (error) {
    return next(setError(500, error.message || 'Catch sendPasswordRedirect'));
  }
};

//<--SEC                                             WITH AUTH                                                     ->
//<--SEC                                             WITH AUTH                                                     ->
//<--SEC                                             WITH AUTH                                                     ->

//<--SEC                                           PASSWORD CHANGE                                              ->

const passwordChange = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const isValidPassword = validator.isStrongPassword(newPassword);

    if (isValidPassword) {
      const { _id } = req.user;
      if (bcrypt.compareSync(password, req.user.password)) {
        const newHashedPassword = bcrypt.hashSync(newPassword, 10);
        try {
          await User.findByIdAndUpdate(_id, {
            password: newHashedPassword,
          });
          const updatedUser = await User.findById(_id);
          if (bcrypt.compareSync(newPassword, updatedUser.password)) {
            return res.status(200).json('Password updated succesfully.');
          } else {
            return res.status(404).json('Password not updated.');
          }
        } catch (error) {
          return res.status(404).json({
            error: 'Error updating password.',
            message: error.message,
          });
        }
      } else {
        return res
          .status(404)
          .json('Password is not correct. Please input your password.');
      }
    } else {
      return res
        .status(404)
        .json(
          'Password needs one special character, 8 minimum letters, one in uppercase and at least a number.'
        );
    }
  } catch (error) {
    return next(
      setError(500, error.message || 'Error in change password catch.')
    );
  }
};

//<--SEC                                          UPDATE USER                                                   ->

const updateUser = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    await User.syncIndexes();
    const patchedUser = new User(req.body);
    req.file && (patchedUser.image = catchImage);

    patchedUser._id = req.user._id;
    patchedUser.password = req.user.password;
    patchedUser.role = req.user.role;
    patchedUser.confirmationEmailCode = req.user.confirmationEmailCode;
    patchedUser.userEmail = req.user.userEmail;
    patchedUser.isVerified = req.user.isVerified;

    if (req.body?.gender) {
      const enumResult = enumOk(req.body?.gender);
      patchedUser.gender = enumResult.check
        ? req.body?.gender
        : req.user.gender;
    }

    try {
      await User.findByIdAndUpdate(req.user._id, patchedUser);
      req.file && deleteImgCloudinary(req.user.userEmail);

      //------testing---------
      const updatedUser = await User.findById(req.user._id);
      const updatedKeys = Object.keys(req.body);
      const testingUpdate = [];

      updatedKeys.forEach((item) => {
        if (updatedUser[item] === req.body[item]) {
          if (updatedUser[item] != req.user[item]) {
            testingUpdate.push({ [item]: true });
          } else {
            testingUpdate.push({ [item]: 'Information is the same.' });
          }
        } else {
          testingUpdate.push({ [item]: false });
        }

        if (req.file) {
          updatedUser.image === catchImage
            ? testingUpdate.push({ image: true })
            : testingUpdate.push({ image: false });
        }
        return res.status(200).json({ updatedUser, testingUpdate });
      });
    } catch (error) {
      return res
        .status(404)
        .json({ error: 'Error in updating the user', message: error.message });
    }
  } catch (error) {
    req.file && deleteImgCloudinary(catchImage);
    return next(
      setError(500, error.message || 'Error in update general catch.')
    );
  }
};

//<--SEC                                        DELETE USER                                                     ->

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.user; // I could also grab the pass and email through the req.user but I thought it safer this way.
    const dataBaseUser = await User.findById(_id);
    if (
      req.body.password === dataBaseUser.password &&
      req.body.userEmail === dataBaseUser.userEmail
    ) {
      try {
        await User.findByIdAndDelete(req.user?._id);
        deleteImgCloudinary(req.user?.image);
        const doesUserExist = User.findById(req.user._id);
        return res
          .status(doesUserExist ? 404 : 200)
          .json(
            doesUserExist
              ? 'User deleted successfully.'
              : 'User not deleted. Pleaser try again.'
          );
      } catch (error) {
        return res
          .status(500)
          .json({ error: 'Error in delete catch', message: error.message });
      }
    } else {
      return res
        .status(404)
        .json('Error in input fields, please check spelling and try again.');
    }
  } catch (error) {
    return res.status(404).json('Error in general catch.');
  }
};

//<--SEC                                          TOGGLE FOLLOW                                                 ->
const toggleFollow = async (req, res, next) => {
  console.log('hola me ejecutro n toggle');
  try {
    console.log('entro en el primer try');
    const { id } = req.params;
    const { _id, following } = req.user;
    console.log('entro en el segundo try');
    if (following.includes(id)) {
      try {
        console.log('following includes persona de nteres');
        await User.findByIdAndUpdate(_id, {
          $pull: { following: id },
        });
        try {
          await User.findByIdAndUpdate(id, {
            $pull: { followers: _id },
          });
          return res.status(200).json({
            user: await User.findById(_id),
            nowUnfollowing: await User.findById(id),
          });
        } catch (error) {
          return res
            .status(404)
            .json('Error in pulling follower from other user.');
        }
      } catch (error) {
        return res.status(404).json('Error in pulling user from following.');
      }
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { following: id },
        });
        try {
          await User.findByIdAndUpdate(id, {
            $push: { followers: _id },
          });
          return res.status(200).json({
            user: await User.findById(_id),
            nowFollowing: await User.findById(id),
          });
        } catch (error) {
          return res.status(404).json({
            error: error.message,
            message: 'Error in pushing new follower to other user.',
          });
        }
      } catch (error) {
        return res.status(404).json('Error in pushing user to follow.');
      }
    }
  } catch (error) {
    return next(setError(404, 'Error in general catch' | error.message));
  }
};

//<--IMP                                     EXPORTATIONS FOR ROUTING                                           ->
module.exports = {
  userRegistration,
  stateRegister,
  redirectRegister,
  userLogin,
  resendCode,
  newUserCheck,
  autoLogin,
  passChangeWhileLoggedOut,
  sendCode,
  sendPassword,
  passwordChange,
  updateUser,
  deleteUser,
  toggleFollow,
};
