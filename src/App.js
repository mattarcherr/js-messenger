import React, { useState} from 'react';
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
  const [ selRoom, setSelRoom ]       = useState();
  const [ log, setLog]                = useState([]);
  const [ serverName, setServerName ] = useState();

  function connect(address, userName) {
    disconnect();
    socket = io(address, { autoConnect: false});
    socket.auth = { userName };
    socket.connect();

    function onConnect() {
      // socket.emit("handshake", userName);
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
      setLog(msg['log'])
    }

    socket.on('handshake',     onHandshake);
    socket.on('connect',       onConnect);
    socket.on('connection',    onUserChange);
    socket.on('disconnection', onUserChange);
    socket.on('new message',   onNewMessage);
    return () => {
      socket.off('handshake',     onHandshake);
      socket.off('connect',       onConnect);
      socket.off('connection',    onUserChange);
      socket.off('disconnection', onUserChange);
      socket.off('new message',   onNewMessage);
  }}

  function disconnect() {
    setConnected(0);
    setUsers([]);
    setLog([]);
    setServerName();
    setRooms([]);
    setSelRoom();
    socket.disconnect();
  }

  function privateMessage(user) {
    setUsers([]);
    setLog([]);
    setRooms([rooms,user['userName']]);
    setSelRoom(user['userName']);
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
        privateMessage={privateMessage}
      />
      <MessageBox connected={connected}/>
    </>);
}