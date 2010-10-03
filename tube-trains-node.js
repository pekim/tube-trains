const path = require('path');
const staticserver = require('./lib/staticserver');
const websocket = require('./lib/websocket');

const port = 8003;
const webroot = path.join(path.dirname(__filename), 'static');

const server = staticserver.create(port, webroot);
websocket.addToServer(server);
