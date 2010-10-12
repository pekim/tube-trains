require.def(['diagram-metrics', 'diagram-renderer', 'trains-renderer2'],
  function(DiagramMetrics, DiagramRenderer, TrainsRenderer) {
    /**
     * Constructor.
     *
     * @param line the line to render.
     * @param diagramCanvas a canvas element, to render the line diagram on.
     * @param trainsCanvas a canvas element, to render the train positions on.
     * @returns a renderer.
     */
    return function(line, diagramCanvas, trainsCanvas) {
      const defaultFontSize = 12;
      const fontFamily = 'sans-serif';

      const metrics = new DiagramMetrics(fontFamily, line);
      metrics.setFontSize(defaultFontSize);
      //console.log(metrics.getLineDiagramBox());

      const diagramRenderer = new DiagramRenderer(line, metrics, diagramCanvas);
      const trainsRenderer = new TrainsRenderer(line, metrics, trainsCanvas);
      
      this.render = function() {
        diagramRenderer.render();
        trainsRenderer.render();
      };
    };
  }
);
