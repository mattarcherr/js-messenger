import logo from './logo.svg';
import './App.css';

import { React } from 'react'

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'
import TopBar from './components/TopBar'

import { Layout } from './components/Layout'

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        users: []
      };
      this.initSocket();
    }
    initSocket(url) {
      this.setState({status: 'Connecting...'});
      const socket = io.connect(url);
      this.socket = socket;
    }

    render() { return (
      <div>
        <Layout
          top={TopBar}
          main={ChatBox}
          left={UserList}
          bottom={MessageBox} />

      </div>
    );
  }
}

export default App;
