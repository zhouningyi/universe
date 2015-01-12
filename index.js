require.config({
  paths: {
    'zepto': '/bower_components/zepto/zepto',
    'util': '/bower_components/wechat-util/index',
  },
});
define(function(require) {
  require('zepto');
  var Controller = require('./src/controller.js');
  var Loading = require('./src/loading.js');

  function Universe(container) {
    var loading = new Loading();
    loading.begin(function(imgs) {
      new Controller(container, imgs);
    });
  }

  return Universe;
});
