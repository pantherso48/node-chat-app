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

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>' );

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  var getMessageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: getMessageTextbox.val()
  }, function () {
    //clearing out message field after user submits
    getMessageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('unable to fetch location');
  });
});
