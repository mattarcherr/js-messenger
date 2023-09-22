const { Console } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var log = [];
const usernameMap = new Map();

app.get('/', (req, res) => {
  res.send('<script src="/socket.io/socket.io.js"></script><script>var socket = io();</script>');
});


io.on('connection', (socket) => {
  var userName;

  socket.on('name', (msg) => {
    userName = msg;
    console.log(userName + ' connected');
    log.push(userName + ' connected');

    io.emit('connection', {
      name: userName
    });
  });

  socket.on('msg', (msg) => {
    console.log(userName+": "+msg)
    log.push(userName+": "+msg)

    io.emit('new message', {
      name: userName,
      msg: msg
    });
  });

  socket.on('disconnect', () => {
    console.log(userName + ' disconnected');
    log.push(userName + ' disconnected');

    io.emit('disconnection', {
      name: userName
    });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});