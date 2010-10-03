const sys = require('sys');
const http = require('http');
const paperboy = require('paperboy');

const SECOND = 1000;

exports.create = function (port, webroot) {
  server = http.createServer(processRequest);
  server.listen(port);
  return server;

  function processRequest(req, res) {
    const ip = req.connection.remoteAddress;
    
    paperboy
      .deliver(webroot, req, res)
      .addHeader('Expires', 1 * SECOND)
      .addHeader('X-PaperRoute', 'Node')
      .before(function() {
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
  }
}

function log(statCode, url, ip, err) {
  const logStr = statCode + ' - ' + url + ' - ' + ip;
  if (err) {
    logStr += ' - ' + err;
  }

  sys.log(logStr);
}
