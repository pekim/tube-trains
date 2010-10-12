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
      // Create a canvas that can be used as a scratch area when calculating metrics.
      const canvas = $('<canvas style="display: none;">Used for calculating metrics.</canvas>')[0];
      const context = canvas.getContext("2d");
      $('body').append(canvas);

      const topology = new LineTopology(line.topologyText, line.stations);

      var n;
      var lineWidth;
      var tickSize;
      var maximumStationNameWidth;
      var stationNamePadding;
      var stationSpacing;
      
      var stationFont;
      var flagBoxFont;
      
      /**
       * When the font size is altered, all of the metrics are recalculated.
       *
       * @param pixels the new font size, in pixels.
       * @returns nothing, undefined.
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
        return n;
      }

      this.getFlagBoxOffset = function() {
        return n;
      }

      this.getFlagBox = function() {
        return {
          x: n,
          y: n,
          width: 12 * n,
          height: 3 * n
        };
      }

      this.getLineDiagramBox = function() {
        const flagBox = this.getFlagBox();
        
        return {
          x: n,
          y: n + (flagBox.x + flagBox.height) + n,
          width: n + (topology.gridWidth() * this.getCellWidth()) + n,
          height: n + ((topology.gridHeight() - 1) * stationSpacing) + n
        };
      }
      
      this.getCellWidth = function() {
        return tickSize + lineWidth + tickSize +
            stationNamePadding + maximumStationNameWidth + stationNamePadding; 
      }
      
      /**
       * Calculate all of the metrics required by the renderers.
       *
       * Most values are made to be integers, to avoid fuziness when rendered.
       *
       * @returns nothing, undefined.
       */
      function calculateMetrics() {
        const xHeight = Math.round(getXHeight(stationFont));
        // Equivalent to 'x' or 'n' in tfl-line-diagram-standard.
        n = xHeight;
        
        lineWidth = n;
        tickSize = Math.round(0.66 * n);
        stationNamePadding = Math.round(2 * n);
        maximumStationNameWidth = getMaximumStationNameWidth(stationFont);
        stationSpacing = 8 * n;

//        const stationSpacing = 8 * xHeight;
//        const interstation = stationSpacing + tickSize;
//        const trackSeparation = (4 * lineWidth) + maximumStationNameWidth;
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
