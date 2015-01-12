require.config({
  paths: {
    'zepto': '/bower_components/zepto/zepto',
    'util': '/bower_components/wechat-util/index',
  },
});

define(function(require) {
  require('zepto');
  var Universe = require('./index');
  new Universe($('.container'));
});
