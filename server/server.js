const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const http = require('http');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('we out');
  });
  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin','New User Joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    callback();
    io.emit('newMessage', generateMessage(message.from,message.text));
  });
});

server.listen(port, () => {
  console.log("server up");
});

// module.exports = {app};
