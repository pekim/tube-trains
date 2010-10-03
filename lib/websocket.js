var sys = require('sys');
var io = require('./socket.io');

exports.addToServer = function (server) {
  var clientCount = 0;
  
  var socket = io.listen(server, {transports: ['websocket']});
  socket.on('connection', function(client){
    sys.log('connected');
    clientCount++;
    client.send('some data');
    
    for (var c in socket.clients) {
      socket.clients[c].send('Clients : ' + clientCount);
    }
    
    client.on('message', function(message, client){
      sys.log('message : ' + message);
    });

    client.on('disconnect', function(client){
      sys.log('disconnected');
      clientCount--;

      for (var c in socket.clients) {
        socket.clients[c].send('Clients : ' + clientCount);
      }
    });
  });
}
