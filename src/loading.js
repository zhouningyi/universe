define(['zepto'], function() {
  function Loading(container) {
    var host = 'http://open-wedding.qiniudn.com';

    this.resources = {
      bottom: {
        url: host + '/bottom1.png',
        type: 'image',
      },
      top: {
        url: host + '/top1.png',
        type: 'image',
      },
      left: {
        url: host + '/left1.png',
        type: 'image',
      },
      right: {
        url: host + '/right1.png',
        type: 'image',
      },
      front: {
        url: host + '/front1.png',
        type: 'image',
      },
      back: {
        url: host + '/back1.png',
        type: 'image',
      },
    };
  }

  Loading.prototype.begin = function(cb) {//执行载入任务。
    var loadIndex = 0;
    var resources = this.resources;
    var filesN = 0;
    var files = {};
    for (var name in resources) {
      var obj = resources[name];
      (function(name, obj) {
        var img = new Image();
        img.src = obj.url;
        img.onload = function() {
          files[name] = img;
          loadIndex++;
          if (loadIndex === filesN) {
            cb(files);
          }
        }
      })(name, obj);
      filesN++
    }
  };

  return Loading;
});
