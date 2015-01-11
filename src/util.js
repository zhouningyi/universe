define(function() {
  var requestAnimFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };

  var cancelAnimFrame = window.cancelAnimationFrame ||
    window.cancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function(id) {
      window.clearTimeout(id);
    };
  return {
    'cancelAnimFrame': cancelAnimFrame,
    'requestAnimFrame': requestAnimFrame
  };
});
