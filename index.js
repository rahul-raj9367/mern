const express = require('express');
const app = express();
const cors = require('cors');

const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://Rahulraj:Rahulraj-2002@cluster0.dh2u9rs.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected Successfully');
  })
  .catch(() => {
    console.log('Not Connected');
  });

// Define the Mongoose model
const FormModel = mongoose.model('TattooForm', new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  Interested: String,
  tattoo: String,
}));

app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Create a new document using the FormModel
  FormModel.create(formData)
    .then((form) => {
      console.log('Form data saved to MongoDB:', form);

      // Send an email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
          user: 'rahulselvan0810@gmail.com',
          pass: 'mgga hlxv lkdj yyxa',
        },
        tls: {
          rejectUnauthorized: true,
        },
      });

      const mailOptions = {
        from: 'rahulselvan0810@gmail.com',
        to: 'rahulrahulrahul7890@gmail.com',
        subject: 'Tattoo Form Submission',
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nMobile Number: ${formData.mobileNumber} \nInterested: ${formData.Interested}
        \nWhen would you like to get this tattoo?: ${formData.tattoo}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.status(200).json({ message: 'Form submitted successfully' });
    })
    .catch((err) => {
      console.error('Error saving form data:', err);
      res.status(500).json({ message: 'Error submitting form' });
    });
});

app.listen(3002, () => {
  console.log('Server is running at http://localhost:3002');
});
