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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});
socket.emit('createMessage', {
  text: 'tacos',
  from: 'frank'
}, function () {
  console.log('got message');
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
})
