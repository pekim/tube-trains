require.def(['line-topology2'],
  function(LineTopology) {
    /**
     * Constructor.
     *
     * @param fontFamily the font family to create fonts with.
     * @param line data about the tube line (stations etc.).
     * @returns a metrics object.
     */
    return function(fontFamily, line) {
      const canvas = $('<canvas style="display: none;">Used for calculating metrics.</canvas>')[0];
      const context = canvas.getContext("2d");
      $('body').append(canvas);

      const topology = new LineTopology(line.topologyText, line.stations);

      var lineWidth;
      var xHeight;
      
      var stationFont;
      var flagBoxFont;
      
      /**
       * When the font size is altered, all of the metrics are recalculated.
       *
       * @param pixels the new font size, in pixels.
       * @returns nothing.
       */
      this.setFontSize = function(pixels) {
        stationFont = pixels + 'px ' + fontFamily;
        flagBoxFont = 'bold ' + stationFont;
        
        calculateMetrics();
      }
      
      this.getFlagBoxFont = function() {
        return flagBoxFont;
      }

      this.getLineWidth = function() {
        return lineWidth;
      }

      this.getFlagBoxOffset = function() {
        return lineWidth;
      }

      this.getFlagBox = function() {
        return {
          x: lineWidth,
          y: lineWidth,
          width: 12 * lineWidth,
          height: 3 * xHeight
        };
      }

      /**
       * Calculate all of the metrics required by the renderers.
       *
       * @returns nothing.
       */
      function calculateMetrics() {
        // Ensure even (rounding up if necessary), to avoid
        // fuzziness when rendering centred lines.
        xHeight = Math.ceil(getXHeight(stationFont) / 2 ) * 2;

        // Equivalent to 'x' in tfl-line-diagram-standard.
        lineWidth = xHeight;

        // Ensure integer, to avoid fuzziness when rendering.
        const tickSize = Math.round(0.66 * lineWidth);

        const stationSpacing = 8 * xHeight;
        const interstation = stationSpacing + tickSize;
        const maximumStationNameWidth = getMaximumStationNameWidth(stationFont);
        const trackSeparation = (4 * lineWidth) + maximumStationNameWidth;

        const diagramWidth = (2 * (8 * lineWidth)) + (topology.gridWidth() * trackSeparation);
        const diagramHeight = (8 * lineWidth) + ((topology.gridHeight() - 1) * stationSpacing) + ((4 * lineWidth));
      }

      function clear() {
        canvas.width = canvas.width;
      }

      function getXHeight(font) {
        clear();
        context.font = font;
        context.fillStyle = "black";
        context.textBaseline = 'top';
        context.fillText('x', 2, 2);
        
        var width = context.measureText('x').width;
        var height = 2 * width;
        var imageData = context.getImageData(2, 2, width, height);
        clear();
        
        var yStart, yEnd;
        var pixel = 0;
        for (var y = 0; y < height; y++) {
          for (var x = 0; x < 4 * width; x += 4) {
            if (imageData.data[pixel + 3] != 0) {
              if (!yStart) {
                yStart = y;
              }
              yEnd = y;
            }
            
            pixel += 4;
          }
        }
        
        return yEnd - yStart + 1;
      }
      
      function getMaximumStationNameWidth(font) {
        context.font = font;
        var maximumTextWidth = 0;
        
        for (var s in line.stations) {
          var station = line.stations[s];
          var textWidth = context.measureText(station.name).width;
          if (textWidth > maximumTextWidth) {
            maximumTextWidth = textWidth;
          }
        }
        
        return maximumTextWidth;
      }
    };
  }
);
