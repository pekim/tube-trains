require(['require', 'url'],
  function(require, url) {
    const lineName = url.getParameter('line');
    const dataPath = '/line-data/';

    const jsonFilename = 'text!' + dataPath + lineName + '.json';
    const topologyFilename = 'text!' + dataPath + lineName + '.topology';
    
    require(['line-renderer2', jsonFilename, topologyFilename],
      function(LineRenderer, json, topology) {
        $(function() {
          const line = JSON.parse(json);
          line.topologyText = topology;

          const diagramCanvas = $('#tube-line')[0];
          const trainsCanvas = $('#tube-trains')[0];
          const lineRenderer = new LineRenderer(line, diagramCanvas, trainsCanvas);
          lineRenderer.render();

          document.title = line.name + ' line';
          
          $('.loading, .loaded').toggle();
        });
      }
    );
  }
);
