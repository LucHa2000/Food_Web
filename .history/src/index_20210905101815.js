const express = require('express');
const cookieParser = require('cookie-parser'); //use cookies
var methodOverride = require('method-override'); //override put patch
const path = require('path'); // tra ve path cua file run
const handlebars = require('express-handlebars'); // layout
const morgan = require('morgan'); //get logger client sen
const nodemailer = require('nodemailer'); //sendEmailConfirm
//option capcha
const app = express();
const port = 3000;

//var nodemailer = require("nodemailer");//sendEmailConfirm
// var transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'danchoiphonui27@gmail.com', // generated ethereal user
//     pass: 'danchoiphonui27'// generated ethereal password
//   }
//   });
//   var mailMessage = {
//     from: 'danchoiphonui27@gmail.com',
//     to: 'havietlucit2000@gmail.com',
//     subject: 'Confirm Email',
//     text: 'new confirm'
//   };
//   transporter.sendMail(mailMessage, function(error, data){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + data.response);
//     }
//   });

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //read file static
app.use(methodOverride('_method'));

const route = require('./routes');
const db = require('./config/db');
db.connect();
//up file image

app.use(express.urlencoded({ extended: true })); //use req.body when post method
app.use(morgan('combined'));
app.use(express.json());
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs', //config hbs
    helpers: {
      sum: (a) => (a == a ? a + 1 : a), //create helpers
      accType: (a,b)
    },
  }),
); //dinh nghia hadlebars = handlebars function
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
route(app); // run route
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
