function TrainsRenderer() {
  var that = this;

  var canvas = $('#tube-trains')[0];
  var context = canvas.getContext('2d');
  
  var y = 251;
  
  this.render = function () {
    // Clear canvas.
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = "red";
    
    context.fillRect(211, y, 10, 15);
    y -= 16;
    if (y < 180) y = 251;
  };
}
