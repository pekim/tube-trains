$(document).ready(function () {
  var refreshTimerFullWidth = $('.refresh-timer').width();
  var refreshPeriod;
  var expectedRefreshTime;

  new SocketSubscription({monitor: true}, function(message) {
    //console.log('message : ' + message);
    var statistics = JSON.parse(message);
    
    $('.websocket-connections').text(statistics.clients);
    $('.memory-usage').text(JSON.stringify(statistics.memoryUsage));
    
    refreshPeriod = statistics.refreshPeriod;
    expectedRefreshTime = new Date().getTime() + statistics.refreshPeriod;
    $('.refresh-timer').width(refreshTimerFullWidth);
  });
  
  setInterval(function() {
    var timeLeft = expectedRefreshTime - new Date().getTime();
    var fractionLeft = timeLeft / refreshPeriod;
    var pixels = fractionLeft * refreshTimerFullWidth;
    $('.refresh-timer').width(pixels);
  }, 100);
});
