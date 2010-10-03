var
  sys = require('sys'),
  path = require('path'),
  http = require('http'),
  paperboy = require('paperboy'),
  io = require('./lib/socket.io'),

  PORT = 8003,
  WEBROOT = path.join(path.dirname(__filename), 'static'),
  SECOND = 1000,
  
  server = http.createServer(function(req, res) {
  	var ip = req.connection.remoteAddress;
    
  	paperboy
      .deliver(WEBROOT, req, res)
      .addHeader('Expires', 1 * SECOND)
      .addHeader('X-PaperRoute', 'Node')
      .before(function() {
        //sys.log('Received Request');
  	  })
      .after(function(statCode) {
	      log(statCode, req.url, ip);
  	  })
      .error(function(statCode, msg) {
	      res.writeHead(statCode, {'Content-Type': 'text/plain'});
	      res.end("Error " + statCode);
	      log(statCode, req.url, ip, msg);
  	  })
      .otherwise(function(err) {
	      res.writeHead(404, {'Content-Type': 'text/plain'});
	      res.end("Error 404: File not found");
	      log(404, req.url, ip, err);
  	  });
  });
  server.listen(PORT);

var socket = io.listen(server/*, {transports: ['websocket']}*/);

socket.on('connection', function(client){
  sys.log('connected');
  client.send('some data');
  
  client.on('message', function(message, client){
    sys.log('message : ' + message);
  });

  client.on('disconnect', function(client){
    sys.log('disconnected');
  });
});

function log(statCode, url, ip, err) {
  var logStr = statCode + ' - ' + url + ' - ' + ip;
  if (err) {
    logStr += ' - ' + err;
  }

  sys.log(logStr);
}
