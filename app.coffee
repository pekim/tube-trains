express = require('express')
routes = require('./lib/routes')

app = module.exports = express.createServer()

app.configure ->
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(require('stylus').middleware({ src: __dirname + '/public' }))
  app.use(app.router)
  app.use(express.static(__dirname + '/public'))


app.configure 'development', ->
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
  app.use(require('browserify')({
    require : [
      { jquery : 'jquery-browserify' },
      __dirname + '/public/javascripts/site.coffee'
    ]
  }));

app.configure 'production', ->
  app.use(express.errorHandler())
  app.use(require('browserify')({
    require : [
      { jquery : 'jquery-browserify' },
      __dirname + '/public/javascripts/site.coffee'
    ]
    filter : require('uglify-js')
  }));

routes.add(app)

app.listen(3000)
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env)
