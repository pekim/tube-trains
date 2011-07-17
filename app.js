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
      {name: 'Bakerloo', class: "bakerloo", code: 'DIS'},
      {name: 'Central', class: "central", code: 'DIS'},
      {name: 'Circle', class: "circle", code: 'DIS'},
      {name: 'District', class: "district", code: 'DIS'},
      {name: 'Hammersmith & City', class: "hammersmith-city", code: 'DIS'},
      {name: 'Jubilee', class: "jubilee", code: 'DIS'},
      {name: 'Metropolitan', class: "metropolitan", code: 'DIS'},
      {name: 'Northern', class: "northern", code: 'DIS'},
      {name: 'Piccadilly', class: "piccadilly", code: 'DIS'},
      {name: 'Victoria', class: "victoria", code: 'VIC'},
      {name: 'Waterloo & City', class: "waterloo-city", code: 'DIS'}
    ]
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
