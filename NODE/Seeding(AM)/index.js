const express = require ('express');
const dotenv = require ('dotenv');
dotenv.config();

const { configCloudinary } = require('./src/middleware/files.middleware');
configCloudinary();

const seed = require('./src/utils/seeds/AM.seed');
seed();


//const { connect } = require('mongoose');
//setTimeout(()=> connect(), 3000);


const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});


const PORT = process.env.PORT;
app.disable('x-powered-by');
app.listen(PORT, ()=> console.log(`Server is listening in port http://localhost:${PORT}`))
