const express = require('express');
const cookieParser = require('cookie-parser'); //use cookies
const MongoStore = require('connect-mongo'); //session with mongoDB
const session = require('express-session'); //session
const flash = require('connect-flash'); //flash session
const methodOverride = require('method-override'); //override put patch
const path = require('path'); // tra ve path cua file run
const handlebars = require('express-handlebars'); // layout
const morgan = require('morgan'); //get logger client sen
const nodemailer = require('nodemailer'); //sendEmailConfirm

const moment = require('moment');
const SortMiddleware = require('./app/middlewares/SortMiddlewares');
const schedule = require('node-schedule');
const app = express();
const port = 8000;

app.use(cookieParser());

//use session
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/MedicalDB',
      // autoRemove: 'native',
      // autoRemoveInterval: 10
    }),
    cookie: {
      maxAge: 180 * 60 * 1000,
      secure: false,
    },
  }),
);
app.use(flash());
app.use(express.static(path.join(__dirname, 'public'))); //read file static
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public'))); //read file static
app.use(methodOverride('_method'));

app.use(SortMiddleware);
const route = require('./routes');
const db = require('./config/db');
db.connect();
//up file image

app.use(
  express.urlencoded({
    extended: true,
  }),
); //use req.body when post method
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
