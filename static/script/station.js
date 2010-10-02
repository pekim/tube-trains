function Station(code, name) {
  var that = this;

  var stationBelow;
  var stationAbove;
  var stationDownRight;
  var stationDownLeft;
  
  this.code = function () {
    return code;
  };

  this.name = function () {
    return name;
  };
  
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
      //station.upTo(that);
    } else {
      return stationDownRight;
    }
  };
  
  this.downLeftTo = function (station) {
    if (station) {
      stationDownLeft = station;
      //station.upTo(that);
    } else {
      return stationDownLeft;
    }
  };
  
  this.toString = function () {
    return code;
  };
}