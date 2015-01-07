define(function() {

  if (!window.requestAnimFrame) {
    window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          return window.setTimeout(callback, 1000 / 60);
        };
    })();

    window.cancelAnimFrame = (function() {
      return window.cancelAnimationFrame ||
        window.cancelRequestAnimationFrame ||
        window.mozCancelAnimationFrame ||
        function(id) {
          window.clearTimeout(id);
        };
    })();
  }
});

console.log('requestAnimFrame')
