function SocketSubscription(channel, messageCallback) {
  var socket = new io.Socket();
  
  socket.on('connect', function() {
    console.log('connected');
    socket.send(JSON.stringify({subscribe: channel}));
  });
  
  socket.on('message', function(message) {
    messageCallback(message);
  });
  
  socket.on('disconnect', function() {
    console.log('disconnected');
  });
  
  socket.connect();
}
