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

app.use(express.static(__dirname + '/public'));


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


app.post('/lexicon',(req,res)=>{
  const {name ,email,date, address,number,totalbudget,companyname,numberofPax,eventtype, venue} = req.body

  const mail = {
    from: 'LEXICON EVENTS <okoroafordavid61@gmail.com>',  
    to: 'another@sample.com', 
    tile: 'LEXICON EVENT CONTACT',
    subject: 'Sample Subject', 
    html: `<body style="margin: 0; padding: 0;"> 
        <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
            <tr>
                <td style="padding: 10px 0 30px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                        <tr>
                            <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/h1.gif" alt="Creating Email Magic" width="300" height="230" style="display: block;" />
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
                                            
                                            <b>${val.title}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                            ${name}
                                        </td>
                                        <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        ${email}
                                    </td>
                                    <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                    ${address}
                                </td>
                                <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                ${number}
                            </td>
                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                ${eventtype}
                            </td>
                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                ${numberofPax}
                            </td>
                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                ${totalbudget}
                            </td>
                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                ${companyname}
                            </td>
                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                ${venue}
                            </td>
                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                ${date}
                            </td>
                                    </tr>
                                    <tr>
        
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>                
                    </table>
                </td>
            </tr>
        </table>
    </body>
        ` // email content in HTML. You can write any Html template in here
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





