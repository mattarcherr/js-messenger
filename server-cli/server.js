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
  res.send('<script src="https://cdn.socket.io/3.1.3/socket.io.min.js" integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh" crossorigin="anonymous"></script><script>var socket = io();</script>');
  // res.send("Hello World!")
});


io.on('connection', (socket) => {
  var userName;

  socket.on('name', (msg) => {
    userName = msg;
    console.log(userName + ' connected');
    log.push({username: "server", message: userName+" has connected"});
    connectedUsers.push(userName);
    io.emit('connection',
      connectedUsers
    );
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
      name: userName
    });
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});