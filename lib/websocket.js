var sys = require('sys');
var io = require('./socket.io');

exports.addToServer = function (server) {
  var clientCount = 0;
  var monitorClients = {};
  
  var socket = io.listen(server, {transports: ['websocket']});
  socket.on('connection', function (client) {
    clientCount++;
    //client.send('some data');
    
//    for (var c in socket.clients) {
//      socket.clients[c].send('Clients : ' + clientCount);
//    }
    
    client.on('message', function (message) {
      message = JSON.parse(message);
      
      if (message.subscribe) {
        if (message.subscribe.line) {
          var line = message.subscribe.line;
          sys.log('Subscription to line : ' + line);
        } else if (message.subscribe.monitor) {
          monitorClients[client.sessionId] = client;
        } else {
          sys.log('Unrecognised subscription : ' + sys.inspect(message.subscribe));
        }
      } else {
        sys.log('Unrecognised message : ' + sys.inspect(message));
      }
    });

    client.on('disconnect', function () {
      clientCount--;

      delete monitorClients[client.sessionId];
    });
  });
  
  setInterval(function () {
    var statistics = {
      clients: clientCount
    };

    for (var c in monitorClients) {
      var client = monitorClients[c];
      client.send(JSON.stringify(statistics));
    }
  }, 2 * 1000);
}
