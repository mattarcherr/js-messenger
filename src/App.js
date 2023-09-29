import React, { useState, useEffect } from 'react';

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'
import TopBar from './components/TopBar'

import Layout from './components/Layout'

import { socket } from './socket'

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [Events, setFooEvents] = useState([]);
  const [ users, setUsers] = useState(["test"]);

  useEffect(() => {
    function onConnect() {
      socket.emit("name", "matt");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onNewConnection(msg) {
      console.log("vasd");
      console.log(msg);
      setUsers([users, msg]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('msg',onNewConnection);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo',onNewConnection);
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