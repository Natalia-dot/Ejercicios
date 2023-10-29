const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

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

app.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  return next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'unexpected error');
});

app.disable('x-powered-by');
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
