const storeRouter = require('./store');
const adminRouter = require('./admin');
const authRouter = require('./auth');
const articleRouter = require('./article');
const homeRouter = require('./home');
const listRouter = require('./list');
const accountRouter = require('./account');
const reviewRouter = require('./review');
const promotionRouter = require('./promotion');
const promotion_detailRouter = require('./promotion_detail');
const promotion_detail_updateRouter = require('./promotion_detailUpdate');
const orderRouter = require('./order');
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');

function router(app) {
  app.use('/list', listRouter);
  app.use('/promotion', promotionRouter);
  app.use('/store', storeRouter);
  app.use('/account', accountRouter);
  app.use('/article', articleRouter);
  app.use('/auth', authRouter);
  app.use('/review', reviewRouter);
  app.use('/admin', adminRouter);
  app.use('/order', orderRouter);
  app.use('/promotionDetail', promotion_detailRouter);
  app.use('/promotionDetailUpdate', promotion_detail_updateRouter);
  app.use('/', homeRouter);
}
module.exports = router;