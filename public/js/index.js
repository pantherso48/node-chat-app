// creates connection to send and recieve data from server
var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});
socket.on('disconnect', function() {
  console.log('disconnected to server');
});
socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});