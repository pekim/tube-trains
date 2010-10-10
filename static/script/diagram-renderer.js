require.def([],
  function() {
    /**
     * Constructor.
     *
     * @param line the line to render.
     * @param metrics metrics needed to render the diagram.
     * @param canvas a canvas element, to render on.
     * @returns a renderer.
     */
    return function(line, metrics, canvas) {
      const context = canvas.getContext("2d");

      const stationColour = 'rgb(0, 24, 168)';
      const flagTextColour = 'rgb(255, 255, 255)';

      this.render = function() {
        // Clear canvas.
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawFlagBox();
//        drawTubeLine(8 * lineWidth, 8 * lineWidth);
      };

      function drawFlagBox() {
        const box = metrics.getFlagBox();
        
        context.fillStyle = line.colour;
        context.fillRect(box.x, box.y, box.width, box.height);  

        context.fillStyle = flagTextColour;  
        context.font = metrics.getFlagBoxFont();
        context.textBaseline = 'middle';

        const text = line.name;
        const textWidth = context.measureText(text).width;
        
        context.fillText(text, box.x + ((box.width - textWidth) / 2), box.y + (box.height / 2));
      }
    };
  }
);
