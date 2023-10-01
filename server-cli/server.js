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

app.get('/', (req, res) => {
  res.send("Hello World!")
});


io.on('connection', (socket) => {
  var userName;

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
      useers:connectedUsers,
      log:log
    });
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});