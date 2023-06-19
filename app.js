import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

// Enable Express app to receive JSON data
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(compression());


app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.post('/api/v1/forms', async (req, res) => {
    const { name, phone, clientType, document, comment } = req.body;

    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: '27112001luis@gmail.com',
            pass: 'todyerfhgtqqcoja'
        }
    }

    const message = {
        from: '27112001luis@gmail.com',
        to: 'luzul2424@gmail.com',
        subject: "New Form",
        html: `Name: ${name} <br/> Phone: ${phone} <br/> Client Type: ${clientType} <br/> Document: ${document} <br/> Comment: ${comment}`
    }

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);

    res.status(200).json({
        status: 'success',
        message: 'Message sent successfully'
    })

})



app.all("*", (req, res) => {
    res.status(404).json({
      status: "error",
      message: `${req.method} ${req.url} does not exists in our server`,
    });
  });


export default app;
