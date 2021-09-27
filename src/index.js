const express = require('express');
const cookieParser = require('cookie-parser'); //use cookies
var methodOverride = require('method-override'); //override put patch
const path = require('path'); // tra ve path cua file run
const handlebars = require('express-handlebars'); // layout
const morgan = require('morgan'); //get logger client sen
const nodemailer = require('nodemailer'); //sendEmailConfirm
//option capcha
const moment = require('moment');
const SortMiddleware = require('./app/middlewares/SortMiddlewares');
const schedule = require('node-schedule');
const app = express();
const port = 8000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //read file static
app.use(methodOverride('_method'));
app.use(SortMiddleware);
const route = require('./routes');
const db = require('./config/db');
db.connect();
//up file image

app.use(express.urlencoded({
  extended: true
})); //use req.body when post method
app.use(morgan('combined'));
app.use(express.json());
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs', //config hbs
    helpers: require('./helpers/handlebars'),
  }),
);
//dinh nghia hadlebars = handlebars function
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
route(app); // run route
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});