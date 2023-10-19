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

// handshake
io.use((socket, next) => {
  socket.username = socket.handshake.auth.userName;
  socket.privateMessageLogs = [];
  next();
});

io.on('connection', async (socket) => {

  console.log(socket.username + ' connected');
  log.push({username: "server", message: socket.username+" has connected"});
  connectedUsers.push({userName: socket.username, id: socket.id});
  io.to(socket.id).emit('handshake', socket.id);

  io.emit('connection', {
    users:connectedUsers,
    log:log
  });

  socket.on('msg', (msg) => {
    console.log(socket.username+": "+msg)
    log.push({
      username: socket.username,
      message: msg
    });

    io.emit('new message', {
      log
    });
  });

  socket.on("private message", ({recipientName, msg}) => {
    recipientId = connectedUsers.find((element) => element['userName'] === recipientName)['id'];

    var recipientSocket = io.of('/').sockets.get(recipientId).privateMessageLogs;
    var senderSocket    = socket.privateMessageLogs;

    if (senderSocket.find((element) => element['reciever'] === recipientName) === undefined) {
      senderSocket.push({reciever: recipientName, msgLog: [] })
    }
    if (recipientSocket.find((element) => element['reciever'] === socket.username) === undefined) {
      recipientSocket.push({reciever: socket.username, msgLog: [] })
    }

    senderSocket.find((element) => element['reciever'] === recipientName)['msgLog'].push({
      username: socket.username,
      message: msg
    });
    recipientSocket.find((element) => element['reciever'] === socket.username)['msgLog'].push({
      username: socket.username,
      message: msg
    });

    socket.to(recipientId).emit('private message', {senderId: {name: socket.username, id: socket.id}, msgLog: privateMessageLog});
  })

  socket.on("request log", ({originalSenderId, roomName}) => {
    if (roomName === 'Main Room') {
      socket.to(socket.id).emit('request log', log)
    } else {
      // console.log(io.of('/').sockets.get(originalSenderId));
      // var originalSenderSocket = io.of('/').sockets.get(originalSenderId).privateMessageLogs;
      // var privateMessageLog = originalSenderSocket.find((element) => element['reciever'] === socket.username);
      // socket.to(socket.id).emit('request log', privateMessageLog);
    }
  });

  socket.on('disconnect', () => {
    console.log(socket.username + ' disconnected');
    log.push({username: "server", message: socket.username+" has disconnected"});
    connectedUsers.splice(connectedUsers.indexOf(socket.username), 1);

    io.emit('disconnection', {
      users:connectedUsers,
      log:log
    });
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});