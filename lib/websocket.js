const sys = require('sys');
const io = require('./socket.io');

const monitorRefreshPeriod = 5 * 1000;

exports.addToServer = function (server) {
  var clientCount = 0;
  var monitorClients = {};
  
  var socket = io.listen(server, {transports: ['websocket', 'xhr-multipart', 'xhr-polling']});
  socket.on('connection', function (client) {
    clientCount++;
    sendStatistics();
    
    client.on('message', function (message) {
      message = JSON.parse(message);
      
      if (message.subscribe) {
        if (message.subscribe.line) {
          var line = message.subscribe.line;
          sys.log('Subscription to line : ' + line);
        } else if (message.subscribe.monitor) {
          monitorClients[client.sessionId] = client;
          client.send(JSON.stringify(getStatistics()));
        } else {
          sys.log('Unrecognised subscription : ' + sys.inspect(message.subscribe));
        }
      } else {
        sys.log('Unrecognised message : ' + sys.inspect(message));
      }
    });

    client.on('disconnect', function () {
      clientCount--;
      sendStatistics();

      delete monitorClients[client.sessionId];
    });
  });
  
  function getStatistics() {
    var statistics = {
      refreshPeriod: monitorRefreshPeriod,
      clients: clientCount,
      memoryUsage: process.memoryUsage()
    };
    
    return statistics
  }
    
  function sendStatistics() {
    var statistics = getStatistics();

    for (var c in monitorClients) {
      var client = monitorClients[c];
      client.send(JSON.stringify(statistics));
    }
  }
  
  setInterval(sendStatistics, monitorRefreshPeriod);
}
