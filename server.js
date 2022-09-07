const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
const transporter = nodemailer.createTransport({
  //service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSWORD
  }
});


app.route("/").get(function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

app.get('/styles', function(req, res) {
  res.sendFile(process.cwd()+ "/public/css/styles.css")
});

app.get('/js', (req,res) => {
  res.sendFile(process.cwd() + '/js/scripts.js')
})

app.get('/profile', (req,res) => {
  res.sendFile(process.cwd()+ '/assets/img/profile.jpeg')
})

app.get('/image_large', (req,res) => {
  res.sendFile(process.cwd()+ '/assets/img/portfolio/image_large.jpg')
})

app.get('/image_wt', (req,res) => {
  res.sendFile(process.cwd()+ '/assets/img/portfolio/image_wt.jpg')
})

app.get('/duduzilli', (req,res) => {
  res.sendFile(process.cwd()+ '/assets/img/portfolio/duduzilliImage.jpg')
})

app.get('/quiz_page', (req,res) => {
  res.sendFile(process.cwd()+ '/assets/img/portfolio/quiz_screen.jpg')
})

app.get('/login_page', (req,res) => {
  res.sendFile(process.cwd()+ '/assets/img/portfolio/login.jpg')
})

app.get('/icon1', (req,res) => {
  res.sendFile(process.cwd()+ '/assets/images/')
})






app.post('/send', (req, res) => {
  
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    const mail = {
      from: 'PORTFOLIO <okoroafordavid61@gmail.com>',
      to: 'okoroafordavid61@gmail.com',
      subject: 'MESSAGE FROM PORTFOLIO WEBSITE',
      text: `name: ${fields['name']} \n email: ${fields['email']} \n phone: ${fields['phone']} \n\n ${fields['message']}`,
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  })
})






