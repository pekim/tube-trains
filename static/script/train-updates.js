$(document).ready(function () {
  new SocketSubscription({line: 'district'}, function(message) {
    console.log('message : ' + message);
  });
  
  var trainsRenderer = new TrainsRenderer();

  setInterval(function() {
    trainsRenderer.render();
  }, 2000);
});
