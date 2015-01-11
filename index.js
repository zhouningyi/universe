require.config({
  // baseUrl: "",
  paths: {
    'zepto': '/bower_components/zepto/zepto',
    'util': '/bower_components/wechat-util/index',
  },
  // shim: {
  //   'zepto': {　　　　　　　　
  //     exports: '$1'　　　　　　
  //   },
  // }
});
define(['zepto','./src/controller', './src/loading'], function(w, Controller, Loading) {
  var loading = new Loading();
  loading.begin(function(imgs) {
    new Controller($('.container'), imgs);
  });
});
