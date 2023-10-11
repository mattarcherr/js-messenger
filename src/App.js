import React, { useState, useEffect} from 'react';
import './App.css'

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'
import TopBar from './components/TopBar'
import ConnectionSideBar from './components/ConnectSideBar';

// import { socket } from './socket'
import io from 'socket.io-client';

export var socket;

export default function App() {
  const [ address, setAddress ] = useState('');
  const [ userName, setUserName ] = useState('');

  const [ users, setUsers] = useState([]);
  const [ log, setLog] = useState([]);
  const [ serverName, setServerName ] = useState();

  function updateAddress(address) {
    console.log(address);
    socket = io(address);

    function onConnect() {
      console.log("onConnect")
      socket.emit("name", "matt");
      setServerName('http://localhost:4000');
    } function onUserChange(msg) {
      setUsers(msg['users']);
      setLog(msg['log']);
    } function onNewMessage(msg) {
      setLog(msg['log'])
    }
    socket.on('connect',       onConnect);
    socket.on('connection',    onUserChange);
    socket.on('disconnection', onUserChange);
    socket.on('new message',   onNewMessage);
    return () => {
      socket.off('connect',       onConnect);
      socket.off('connection',    onUserChange);
      socket.off('disconnection', onUserChange);
      socket.off('new message',   onNewMessage);
    }}

  return (<>
      <TopBar serverName={serverName}/>
      <ConnectionSideBar connect={connect}/>
      <ChatBox log={log}/>
      <UserList users={users}/>
      <MessageBox />
    </>);
}