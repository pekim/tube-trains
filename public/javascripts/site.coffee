$ = require 'jquery'
Raphael = require './raphael'

$(document).ready ->
  diagram = Raphael $('#line-diagram')[0], 0, 0, 200, 200
  text = diagram.text 20, 20, 'some text i'
  text.attr 'font-size', 50
  text.attr 'font-family', 'London-Tube'