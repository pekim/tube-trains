require.def([],
  function() {
    /**
     * Constructor.
     *
     * @param line the line to render.
     * @param canvas a canvas element, to render on.
     * @returns a renderer.
     */
    return function(line, metrics, canvas) {
      const context = canvas.getContext("2d");
      
      this.render = function() {
      };
    };
  }
);
