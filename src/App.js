import logo from './logo.svg';
import './App.css';

import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <div><ListGroup/></div>
//       </header>
//     </div>
//   );
// }

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
