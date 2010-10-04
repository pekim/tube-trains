function Station(code, name) {
  var that = this;

  var stationBelow;
  var stationAbove;
  var stationDownRight;
  var stationDownLeft;
  var stationUpRight;
  var stationUpLeft;
  
  this.code = function () {
    return code;
  };

  this.name = function () {
    return name;
  };
  
  this.numberOfAdjacentStations = function() {
    return 0 +
    (stationAbove ? 1 : 0) +
    (stationBelow ? 1 : 0) +
    (stationDownRight ? 1 : 0) +
    (stationDownLeft ? 1 : 0) +
    (stationUpRight ? 1 : 0) +
    (stationUpLeft ? 1 : 0);
  }
  
  this.downTo = function (station) {
    if (station) {
      stationBelow = station;
      station.upTo(that);
    } else {
      return stationBelow;
    }
  };
  
  this.upTo = function (station) {
    if (station) {
      stationAbove = station;
      station.stationBelow = that;
    } else {
      return stationAbove;
    }
  };
  
  this.downRightTo = function (station) {
    if (station) {
      stationDownRight = station;
      station.upLeftTo(that);
    } else {
      return stationDownRight;
    }
  };

  this.upLeftTo = function (station) {
    if (station) {
      stationUpLeft = station;
      station.stationDownRight = that;
    } else {
      return stationUpLeft;
    }
  };
  
  this.downLeftTo = function (station) {
    if (station) {
      stationDownLeft = station;
      station.upRightTo(that);
    } else {
      return stationDownLeft;
    }
  };

  this.upRightTo = function (station) {
    if (station) {
      stationUpRight = station;
      station.stationDownLeft = that;
    } else {
      return stationUpRight;
    }
  };

  this.toString = function () {
    return code;
  };
}