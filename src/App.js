import logo from './logo.svg';
import './App.css';

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'

import { Layout } from './components/Layout'

function App() {
  return (
    <div>
      <Layout
        main={ChatBox}
        left={UserList}
        bottom={MessageBox}
      />

    </div>
  )
}

export default App;
