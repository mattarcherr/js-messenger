const { Console } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

var log = [];
var connectedUsers = [];

var room1Pop = 0;
var room2Pop = 0;
var room3Pop = 0;

app.get('/', (req, res) => {
  res.send("Hello World!")
});


io.on('connection', (socket) => {
  console.log("CONNECTION");
  var userName;

  io.emit('handshake', {
    rooms:{
      "room1": room1Pop,
      "room2": room2Pop,
      "room3": room3Pop
    }
  });

  socket.on('name', (msg) => {
    userName = msg;
    console.log(userName + ' connected');
    log.push({username: "server", message: userName+" has connected"});
    connectedUsers.push(userName);
    io.emit('connection', { 
      users:connectedUsers,
      log:log
    });
  });

  socket.on('msg', (msg) => {
    console.log(userName+": "+msg)
    log.push({
      username: userName,
      message: msg
    });

    io.emit('new message', {
      log
    });
  });

  socket.on('disconnect', () => {
    console.log(userName + ' disconnected');
    log.push({username: "server", message: userName+" has disconnected"});
    connectedUsers.splice(connectedUsers.indexOf(userName), 1);

    io.emit('disconnection', {
      users:connectedUsers,
      log:log
    });
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});