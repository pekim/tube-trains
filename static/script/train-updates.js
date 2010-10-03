$(document).ready(function () {
  new SocketSubscription({line: 'district'}, function(message) {
    console.log('message : ' + message);
  });
});
