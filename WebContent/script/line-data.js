function loadLine(name, callback) {
  $.ajax({
    url: 'line-data/' + name + '.json',
    dataType: 'json',
    success: function(line) {
      loadTopology(name, line, callback);
    },
    error: function(xhr, textStatus, errorThrown) {
      throw textStatus + " : " + errorThrown;
    }
  });
}

function loadTopology(name, line, callback) {
  $.ajax({
    url: 'line-data/' + name + '.topology',
    success: function(topology) {
      line.topologyText = topology;
      callback(line);
    },
    error: function(xhr, textStatus, errorThrown) {
      throw textStatus + " : " + errorThrown;
    }
  });
}
