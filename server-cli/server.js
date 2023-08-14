const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var log = [];

app.get('/', (req, res) => {
  res.send('<script src="/socket.io/socket.io.js"></script><script>var socket = io();</script>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('msg', (msg) => {
    console.log(msg['name']+ ": "+msg['msg']);

    log.push(msg['name']+ ": "+msg['msg'])
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});