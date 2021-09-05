const storeRouter = require('./store');
const adminRouter = require('./admin');
const authRouter = require('./auth');
const homeRouter = require('./home');

function route(app) {
  app.use('/store', storeRouter);
  app.use('/account', accountRouter);
  app.use('/auth', authRouter);
  app.use('/admin', adminRouter);
  app.use('/', homeRouter);
}
module.exports = route;
