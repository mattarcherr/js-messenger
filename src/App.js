import ChatBox from './components/ChatBox'
import UserList from './components/UserList'
import MessageBox from './components/MessageBox'
import TopBar from './components/TopBar'

import { Layout } from './components/Layout'

function App() {
  return (
    <div>
      <Layout
        top={TopBar}
        main={ChatBox}
        left={UserList}
        bottom={MessageBox} 
      />
    </div>
  );
}

export default App;
