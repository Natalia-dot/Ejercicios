const express = require ("express");
const nodemailer = require ("nodemailer");
const dotenv = require ("dotenv");

dotenv.config();

const PORT = process.env.PORT;
const server =  express();
const router = express.Router();

router.get("/sendMail", (req, res, next) =>{
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user: email,
            pass: password,
        }
    })
    const mailOptions = {
        from: email,
        to: "fakemail@gmail.com",
        subject: "Hola, soy xxxx",
        text: "Emails masificados de prueba",
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return next(error)
        } else {
            return res.status(200).json(`Email sent to ${mailOptions.to}`)
        }
    })
})

server.use("/", router)

server.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
} )