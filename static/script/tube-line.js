$(document).ready(function() {
  function getQueryVariable(variable) { 
    var query = window.location.search.substring(1); 
    var vars = query.split("&"); 
    for (var v = 0; v < vars.length; v++) { 
      var pair = vars[v].split("="); 
      if (pair[0] === variable) { 
        return pair[1]; 
      } 
    }
  }
  
  var line = getQueryVariable('line');

  loadLine(line, function(line) {
    var lineRenderer = new LineRenderer(line);
    lineRenderer.render();
  });
});
