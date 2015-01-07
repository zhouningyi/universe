require.config({
  baseUrl: "./bower_components",
  paths: {
    'zepto': 'zepto/zepto',
    'basic': '../src/basic',
  },
  // shim: {
  //   'zepto': {　　　　　　　　
  //     exports: '$1'　　　　　　
  //   },
  // }
});
define(['zepto','basic', '../src/controller', '../src/loading'], function(w1,w2, Controller, Loading) {
  var loading = new Loading();
  loading.begin(function(imgs) {
    new Controller($('.container'), imgs);
  });
});
