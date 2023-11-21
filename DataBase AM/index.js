const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

// const seed = require('./src/helpers/Songseed'); //para sembrar unas cuantas canciones y Albumes
// seed();
// const seed3 = require('./src/helpers/Userseed');
// seed3();
// const seedAlbum = require('./src/helpers/Albumseed');
// seedAlbum();

const { connect } = require('./src/utils/db');
connect();

const { configCloudinary } = require('./src/middleware/files.middleware');
configCloudinary();

const PORT = process.env.PORT;

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: false }));

const UserRoutes = require('./src/api/routes/User.routes');
app.use('/api/v1/users/', UserRoutes);

const SongRoutes = require('./src/api/routes/Song.routes');
app.use('/api/v1/songs/', SongRoutes);

const AlbumRoutes = require('./src/api/routes/Album.routes');
app.use('/api/v1/albums/', AlbumRoutes);

app.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  return next({ error });
});

app.use((error, req, res) => {
  return res.status(error.status || 500).json({ error });
});

app.disable('x-powered-by');
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
