var Connect = require('connect');

var server = Connect.createServer(
  Connect.logger({ format: ':method :url :response-time' }),
  Connect.staticProvider('static')
//    ,
//  function(req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World');
//  }
);

server.listen(3000);
