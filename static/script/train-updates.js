var socket = new io.Socket();

socket.on('connect', function(){
  console.log('connected');
});

socket.on('message', function(message){
  console.log('message : ' + message);
});

socket.on('disconnect', function(){
  console.log('disconnected');
});

socket.connect();
