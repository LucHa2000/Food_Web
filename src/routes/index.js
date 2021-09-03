const storeRouter = require('./store');
const adminRouter = require('./admin');
const authRouter = require('./auth');

function route(app) {
  app.use('/store',storeRouter) 
  app.use('/auth',authRouter)
  app.use('/admin',adminRouter) 

}
module.exports = route;
