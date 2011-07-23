lines = require('./lines').lines
linesByName = require('./lines').linesByName

exports.add = (app) ->
  app.get('/', (req, res) ->
    res.render('index', {
      lines: lines
    })
  )

  app.get('/line/:line', (req, res) ->
    res.render('line', {
      line: linesByName[req.params.line]
    })
  )
