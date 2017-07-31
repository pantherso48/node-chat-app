const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const http = require('http');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
    }
  });

  socket.on('updateUserList', function (users) {
    console.log('Users list', users);
  });

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }
    socket.join(params.room);
    // can only be in one room at a time
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room)
      .emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage
    ('Admin', coords.latitude, coords.longitude));
  });
});

server.listen(port, () => {
  console.log("server up");
});

// module.exports = {app};
