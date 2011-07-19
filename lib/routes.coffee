lines = require('./lines').lines

exports.add = (app) ->
  app.get('/', (req, res) ->
    res.render('index', {
      lines: lines
    })
  )

  app.get('/line/:line', (req, res) ->
    res.send "line : #{req.params.line}"
  )
