define(['zepto'], function() {
  function Cotroller(container, imgs) {
    //基本节点
    this.container = container;
    this.dom();

    this.drag = false;
    this.speedx = 0.02;
    this.speedy = 1.5;
    this.speed = 0.1;
    this.brake = 1.01;
    this.rotatex = 0;
    this.rotatey = 0;
    this.mouse2RotatePhi = 0.9;
    this.width = container.width();
    this.height = container.height();
    this.imgs = imgs;
    this.bg();
    this.events();
    this.loop();
  };

  Cotroller.prototype.dom = function() {
    this.container.append(
      '<div id="universe" class="fullcontainer">' +
      '<div id="panorama"></div>' +
      '</div>');
  }

  Cotroller.prototype.bg = function() {
    var imgs = this.imgs;
    var panorama = this.panorama = this.container.find('#panorama');

    var list = [
      'bottom',
      'top',
      'left',
      'right',
      'front',
      'back'
    ];
    var key, obj, img;
    for (var k in list) {
      key = list[k];
      img = imgs[key];
      img = $(img);
      img.addClass('face f' + (k + 1));
      panorama.append(img);
    }
  };

  Cotroller.prototype.down = function(e) {
    e.preventDefault();
    this.drag = true;
    console.log(e)
    var touch = (e.originalEvent) ? e.originalEvent.touches[0] : e.touches[0];
    var y = touch.clientY;
    this.downY = y;
    this.rotateyDown = this.rotatey;
    this.time = new Date();
  };

  Cotroller.prototype.rotateCube = function(rotation, type) {
    switch (type) {
      case 'x':
        rotation = 'rotateY(' + rotation + 'deg)';
        break;
      case 'y':
        rotation = 'rotateX(' + rotation + 'deg)';
        break;
      case 'xy':
        rotation = 'rotateX(' + rotation.y + 'deg)' + ' rotateY(' + rotation.x + 'deg)';
        break;
    }
    this.panorama.css({
      '-webkit-transform': rotation,
      '-moz-transform': rotation,
      'transform': rotation,
    })
  };

  var curY;
  Cotroller.prototype.move = function(e) {
    e.preventDefault();
    console.log(e,'move')
    var touch = (e.originalEvent) ? e.originalEvent.touches[0] : e.touches[0];
    var y = touch.clientY;
    var x = touch.clientX;
    if (this.drag) {
      var dy = y - this.downY;
      var rotatey = this.rotatey = this.rotateyDown - dy * this.mouse2RotatePhi;
      this.container.trigger('rotatePlanet', rotatey);
      this.rotateCube(rotatey, 'y');
      curY = y;
    }
  };

  Cotroller.prototype.up = function(e) {
    e.preventDefault();
    this.drag = false;
    var dy = this.rotatey - this.rotateyDown;
    var dt = new Date() - this.time;
    this.speedy = dy / dt;
  };

  Cotroller.prototype.events = function() {
    this.container
      .on('touchstart mousedown', this.down.bind(this))
      .on('touchmove mousemove', this.move.bind(this))
      .on('touchend mouseup', this.up.bind(this))
      .on('touchleave', this.up.bind(this));
  };

  Cotroller.prototype.loop = function() {
    var speedx = this.speedx;
    var speedy = this.speedy = this.speedy / this.brake;
    if (!this.drag) {
      var rotatex = this.rotatex += speedx;
      var rotatey = this.rotatey += speedy;
      this.rotateCube({
        x: rotatex,
        y: rotatey
      }, 'xy');
    }
    requestAnimFrame(this.loop.bind(this));
  };

  Cotroller.prototype.clear = function() {
    this.container.empty();
    for (var k in this) {
      delete this[k];
    }
  };
  return Cotroller;
});
