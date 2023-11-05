const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();

//New cloudinary folder
const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'userStorage',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
  },
});

const albumStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'albumStorage',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
  },
});

//Upload images function
const uploadUserPic = multer({ userStorage });
const uploadAlbumPic = multer({ albumStorage });

//Delete images function
const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split('/');
  const nameSplited = imgSplited[imgSplited.length - 1].split('.');
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log('Image deleted in cloudinary');
  });
};

const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

module.exports = { uploadAlbumPic, uploadUserPic, deleteImgCloudinary, configCloudinary };
