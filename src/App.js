import React, { useState, useEffect} from 'react';
import './App.css'

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'
import TopBar from './components/TopBar'
import ConnectionSideBar from './components/ConnectSideBar';

import io from 'socket.io-client';
export var socket;

export default function App() {
  const [ connected, setConnected ] = useState(0);
  const [ users, setUsers] = useState([]);
  const [ log, setLog] = useState([]);
  const [ serverName, setServerName ] = useState();

  function connect(address, userName) {
    console.log(address);
    socket = io(address);

    function onConnect() {
      socket.emit("name", userName);
      setServerName(address);
      setConnected(1);
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

    function disconnect() {
      setConnected(0);
      setUsers([]);
      setLog([]);
      setServerName();
      socket.disconnect();
    }

  return (<>
      <TopBar serverName={serverName} 
              disconnect={disconnect}
              connected={connected}/>
      <ConnectionSideBar connect={connect}/>
      <ChatBox log={log}/>
      <UserList users={users}/>
      <MessageBox />
    </>);
}