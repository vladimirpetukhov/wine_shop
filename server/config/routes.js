const router = require('../routes');

module.exports = (app) => {
  app.use('/api/auth', router.auth);
  app.use('/api/products', router.product);
  app.use('*', (req, res, next) => res.status(400).send('<h1> Wrong route maybe? </h1>'));
};
