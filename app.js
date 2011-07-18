var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    lines: [
      {displayName: 'Bakerloo', name: "bakerloo", code: 'B'},
      {displayName: 'Central', name: "central", code: 'C'},
      {displayName: 'Circle', name: "circle", code: 'H'},
      {displayName: 'District', name: "district", code: 'D'},
      {displayName: 'Hammersmith & City', name: "hammersmith-city", code: 'H'},
      {displayName: 'Jubilee', name: "jubilee", code: 'J'},
      {displayName: 'Metropolitan', name: "metropolitan", code: 'M'},
      {displayName: 'Northern', name: "northern", code: 'N'},
      {displayName: 'Piccadilly', name: "piccadilly", code: 'P'},
      {displayName: 'Victoria', name: "victoria", code: 'V'},
      {displayName: 'Waterloo & City', name: "waterloo-city", code: 'W'}
    ]
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
