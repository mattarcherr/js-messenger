import React, { useEffect, useState} from 'react';
import './App.css'

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'
import TopBar from './components/TopBar'
import ConnectionSideBar from './components/ConnectSideBar';

import io from 'socket.io-client';
export var socket = io();

export default function App() {
  const [ connected, setConnected ]   = useState(0);
  const [ id, setID ]                 = useState();
  const [ users, setUsers]            = useState([]);
  const [ rooms, setRooms]            = useState([]);
  const [ selRoom, setSelRoom ]       = useState('');
  const [ log, setLog]                = useState([]);
  const [ serverName, setServerName ] = useState();

  function connect(address, userName) {
    disconnect();
    socket = io(address, { autoConnect: false});
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
      setUsers(msg['users']);
      setLog(msg['log']);
    } 
    function onNewMessage(msg) {
      if (this.state.selRoom === 'Main Room') {
        setLog(msg['log'])
      }
    }

    function onPrivateMessage({senderId, msgLog}) {
      var senderName = senderId['name'];
      if (!rooms.includes(senderName)) {
        setRooms([rooms,senderName])
        setSelRoom(senderName);
      }
      if (this.state.selRoom === senderName) {
        setLog(msgLog);
      }
    }

    function onRequestLog() {

    }

    socket.on('handshake',     onHandshake);
    socket.on('connect',       onConnect);
    socket.on('connection',    onUserChange);
    socket.on('disconnection', onUserChange);
    socket.on('new message',   onNewMessage);

    socket.on('private message', onPrivateMessage);
    socket.on('request log',     onRequestLog);
    return () => {
      socket.off('handshake',     onHandshake);
      socket.off('connect',       onConnect);
      socket.off('connection',    onUserChange);
      socket.off('disconnection', onUserChange);
      socket.off('new message',   onNewMessage);
      
      socket.off('private message', onPrivateMessage);
      socket.off('request log',     onRequestLog);
  }}

  useEffect(() => {
    if (typeof selRoom === "object") {
      var localSelRoom = selRoom[0];
    } else { localSelRoom = selRoom }
    if (localSelRoom=== 'Main Room') {
      console.log('main')
      socket.emit('request log', {originalSenderId: null, roomName: 'Main Room'})
    } else {
      console.log('pm')
      socket.emit('request log', {originalSenderId: socket.id, roomName: localSelRoom});
    }
  },[selRoom])

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
    setRooms([rooms,user]);
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
        joinPrivateRoom={joinPrivateRoom}
      />
      <MessageBox 
        connected={connected}
        selRoom={selRoom}
      />
    </>);
}