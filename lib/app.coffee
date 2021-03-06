express = require 'express'
browserify = require 'browserify'
uglify = require 'uglify-js'
stylus = require 'stylus'

routes = require './routes'

app = module.exports = express.createServer()

app.configure ->
  app.set('views', __dirname + '/../views')
  app.set('view engine', 'jade')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(stylus.middleware({ src: __dirname + '/../public' }))
  app.use(app.router)
  app.use(express.static(__dirname + '/../public'))

routes.add app

app.configure 'development', ->
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
  app.use(browserify({
    require : [
      #{ jquery : 'jquery-browserify' },
      __dirname + '/../public/javascripts/site.coffee'
    ]
  }));
  app.listen 3000

app.configure 'production', ->
  app.use(express.errorHandler())
  app.use(browserify({
    require : [
      #{ jquery : 'jquery-browserify' },
      __dirname + '/../public/javascripts/site.coffee'
    ]
    filter : uglify
  }));
  app.listen 80

console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
