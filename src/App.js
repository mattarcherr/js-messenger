import logo from './logo.svg';
import './App.css';

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'

function App() {
  return (
    <div>
      <ChatBox />
      <UserList />
      <MessageBox />
    </div>
  )
}

export default App;
