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
      {name: 'Bakerloo', class: "bakerloo", code: 'B'},
      {name: 'Central', class: "central", code: 'C'},
      {name: 'Circle', class: "circle", code: '?'},
      {name: 'District', class: "district", code: 'D'},
      {name: 'Hammersmith & City', class: "hammersmith-city", code: 'H'},
      {name: 'Jubilee', class: "jubilee", code: 'J'},
      {name: 'Metropolitan', class: "metropolitan", code: 'M'},
      {name: 'Northern', class: "northern", code: 'N'},
      {name: 'Piccadilly', class: "piccadilly", code: 'P'},
      {name: 'Victoria', class: "victoria", code: 'V'},
      {name: 'Waterloo & City', class: "waterloo-city", code: 'W'}
    ]
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
