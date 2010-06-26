function Station(code, name) {
  this.code = function () {
    return code;
  };

  this.name = function () {
    return name;
  };
}