import React, { useState, useEffect } from 'react';

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'
import TopBar from './components/TopBar'

import Layout from './components/Layout'

import { socket } from './socket'

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [ users, setUsers] = useState([]);
  const [ log, setLog] = useState([]);
  const [ serverName, setServerName ] = useState();
  console.log(typeof serverName);

  useEffect(() => {
    function onConnect() {
      socket.emit("name", "matt");
      setServerName('http://localhost:4000');
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onUserChange(msg) {
      setUsers(msg['users']);
      setLog(msg['log']);
    }

    function onNewMessage(msg) {
      setLog(msg['log'])
    }

    socket.on('connect',       onConnect);
    socket.on('disconnect',    onDisconnect);
    socket.on('connection',    onUserChange);
    socket.on('disconnection', onUserChange);
    socket.on('new message',   onNewMessage);

    return () => {
      socket.off('connect',       onConnect);
      socket.off('disconnect',    onDisconnect);
      socket.off('connection',    onUserChange);
      socket.off('disconnection', onUserChange);
      socket.off('new message',   onNewMessage);
    };
  }, []);

  return (
    <div>
      <Layout 
        Top={TopBar}
        Main={ChatBox}
        Left={UserList}
        Bottom={MessageBox}
        users={users}
        log={log}
        serverName={serverName}
      />
    </div>
  );
}