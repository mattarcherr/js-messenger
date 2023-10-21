import { socket } from "../App";

function determineSender(username) {
    console.log(socket.username)
    if (username === 'server') {
        return 'ChatBoxListElementServer'
    }
    else if (username === socket.username) {
        return 'ChatBoxListElementMe'
    } else {
        return 'ChatBoxListElement'
    }
}

export default function ChatBox( log ) {
    return (
    <div id='ChatBox-div'>
        <div id='ChatBox'>
            <ul id='ChatBoxList'>
                {log === [] ? null :
                    log['log'].map(item =>
                        <li id={ 
                            determineSender(item['username'])
                        }>{item['username'] +": "+ item['message']}</li>    
                    )
                }
            </ul>
        </div>
    </div>
    )
}
