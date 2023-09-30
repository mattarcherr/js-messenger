import React, { useState, useEffect } from 'react';

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'
import TopBar from './components/TopBar'

import Layout from './components/Layout'

import { socket } from './socket'

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [ users, setUsers] = useState(["test123", "Cas"]);
  const [ msgLog, setMsgLog] = useState([]);

  useEffect(() => {
    function onConnect() {
      socket.emit("name", "matt");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onNewConnection(msg) {
      setUsers(msg);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connection',onNewConnection);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connection',onNewConnection);
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
      />
    </div>
  );
}