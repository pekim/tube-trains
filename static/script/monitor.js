$(document).ready(function () {
  new SocketSubscription({monitor: true}, function(message) {
    console.log('message : ' + message);
    var statistics = JSON.parse(message);
    
    $('.websocket-connections').text(statistics.clients);
  });
});
