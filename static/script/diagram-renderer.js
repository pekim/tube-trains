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
        clear();
        drawFlagBox();
        drawTubeLine();
//      drawTubeLine(8 * lineWidth, 8 * lineWidth);
      };

      /*
       * Clear the canvas.
       */
      function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      /*
       * Draw the 'flag box'; the box with the line's name in white text,
       * on a backgroundand of the line's colour.
       */
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

      /*
       * Draw the line, with tick boxes and station names.
       */
      function drawTubeLine() {
        const box = metrics.getLineDiagramBox();
//        console.log(box);
//        context.fillStyle = line.colour;
//        context.fillRect(box.x, box.y, 1, 1);

//        var y = yStart;
//        
//        var grid = topology.grid();
//        var rows = topology.gridHeight();
//        var columns = topology.gridWidth();
//        
//        for (var row = 0; row < rows; row++) {
//          var x = lineCentre;
//          for (var column = 0; column < columns; column++) {
//            var station = grid[(row * columns) + column];
//            if (station) {
//              drawStation(station, x, y);
//              if (station.downTo()) {
//                drawLineVertical(x, y, interstation);
//              }
//              if (station.downRightTo()) {
//                drawLineDownRight(x, y);
//              }
//              if (station.downLeftTo()) {
//                drawLineDownLeft(x, y);
//              }
//            }
//            
//            x += trackSeparation;
//          }
//
//          y += stationSpacing;
//        }
      }

    };
  }
);
