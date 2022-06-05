const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://author-service-lb-341934567.ap-southeast-1.elb.amazonaws.com/',
      changeOrigin: true,
    })
  );
};