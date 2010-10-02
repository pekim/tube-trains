$(document).ready(function() {
  loadLine('district', function(line) {
    var lineRenderer = new LineRenderer(line);
    lineRenderer.render();
  });
});
