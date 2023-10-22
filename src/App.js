import React, { useEffect, useState} from 'react';
import './App.css'

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'
import TopBar from './components/TopBar'
import ConnectionSideBar from './components/ConnectSideBar';

import io from 'socket.io-client';
export var socket = io();

var localSelRoom = '';
var localRooms   = [];

export default function App() {
  
  const [ connected, setConnected ]   = useState(0);
  const [ id, setID ]                 = useState();
  const [ users, setUsers]            = useState([]);
  const [ rooms, setRooms]            = useState([]);
  const [ selRoom, setSelRoom ]       = useState();
  const [ log, setLog]                = useState([]);
  const [ serverName, setServerName ] = useState();

  function connect(address, userName) {
    disconnect();
    socket = io(address, { autoConnect: false});
    socket.username = userName;
    socket.auth = { userName };
    socket.connect();

    function onConnect() {
      setServerName(address+"@Main Room");
      setConnected(1);
      setSelRoom('Main Room')
      setRooms(['Main Room'])
    }
    function onHandshake(msg) {
      setID(msg);
    }
    function onUserChange(msg) {
      if (msg['splitUser'] !== undefined) {
        if (localRooms.includes(msg['splitUser'])) {
          localRooms.splice(localRooms.indexOf(msg['splitUser'] ,1));
          setRooms(localRooms);
          setSelRoom('Main Room')
        }
      } 
      console.log(msg['users'])
      setUsers(msg['users']);
      setLog(msg['log']);
    }

    function onNewMessage(msg) {
      if (localSelRoom === 'Main Room') {
        setLog(msg['log']);
      } else {
        // add a icon to signify a message has arrived in main room
      }
    }

    function onPrivateMessage({senderName, msgLog}) {
      if (senderName === userName) {
        setLog(msgLog['msgLog']);
      } else {
        if (localSelRoom === senderName) {
          setLog(msgLog['msgLog']);
        }
        if (!localRooms.includes(senderName)) {
          joinPrivateRoom(senderName);
          setLog(msgLog['msgLog'])
        }
      }
    } 

    function onRequestLog({roomName, log}) {
      if (log === undefined) { setLog([]); return }
      if (roomName === localSelRoom) {
        if (roomName === 'Main Room') {
          setLog(log)
        } else {
          setLog(log['msgLog'])
        }
      }
    }

    function onConnectError() {
        disconnect();
        setLog([{
          username: "server",
          message:  "Server failed to connect..."
        }]);
      }
    

    socket.on('handshake',     onHandshake);
    socket.on('connect',       onConnect);
    socket.on('connection',    onUserChange);
    socket.on('disconnection', onUserChange);
    socket.on('new message',   onNewMessage);

    socket.on('private message', onPrivateMessage);
    socket.on('request log',     onRequestLog);

    socket.on('connect_error',   onConnectError);
    return () => {
      socket.off('handshake',     onHandshake);
      socket.off('connect',       onConnect);
      socket.off('connection',    onUserChange);
      socket.off('disconnection', onUserChange);
      socket.off('new message',   onNewMessage);
      
      socket.off('private message', onPrivateMessage);
      socket.off('request log',     onRequestLog);

      socket.on('connect_error',    onConnectError);
  }}

  useEffect(() => {
    localSelRoom = selRoom;
    if (selRoom === 'Main Room') {
      socket.emit('request log', {originalSenderId: null, roomName: 'Main Room'})
    } else {
      socket.emit('request log', {originalSenderId: socket.id, roomName: localSelRoom});
    }
  },[selRoom])

  useEffect(() => {
    localRooms = rooms;
  },[rooms])

  useEffect(() => {
    var element = document.getElementById('ChatBox-div');
    element.scrollTop = element.scrollHeight;
  },[log]);

  function disconnect() {
    setConnected(0);
    setUsers([]);
    setLog([]);
    setServerName();
    setRooms([]);
    setSelRoom();
    socket.disconnect();
  }

  function joinPrivateRoom(user) {
    setLog([]);
    setRooms([...localRooms,user]);
    setServerName('Private Message@'+user)
    setSelRoom(user);
  }

  return (<>
      <TopBar 
        serverName={serverName} 
        disconnect={disconnect}
        connected={connected}
      />
      <ConnectionSideBar 
        connect={connect} 
        rooms={rooms}
        selRoom={selRoom}
        setSelRoom={setSelRoom}
      />
      <ChatBox log={log}/>
      <UserList 
        users={users} 
        id={id}
        rooms={rooms}
        setSelRoom={setSelRoom}
        joinPrivateRoom={joinPrivateRoom}
      />
      <MessageBox 
        connected={connected}
        selRoom={selRoom}
      />
    </>);
}