const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  //creamos template para los user
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, 'Input a valid email.'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword],
    },
    gender: {
      required: true,
      type: String,
      enum: ['male', 'female', 'other'],
    },
    role: {
      //asignar cual es el rol de las personas que entren
      type: String,
      enum: ['admin', 'superadmin', 'user'],
      default: 'user',
    },
    confirmationEmailCode: {
      type: Number,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    favSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    favAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  //hasheamos la contrasena ntes de guardar los datos metidos en el esquema
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next('Error hashing the password. Please retry.', error);
  }
});

const User = mongoose.model('User', UserSchema);
//guardamos en esa base de datos (User) el template UserSchema con los datos rellenos cuando vayamos a usar el User exportado

module.exports = User;
