import { socket } from "../App";

function determineSender(item,i) {
    var id;
    var content;
    if (item['username'] === 'server') {
        id = 'ChatBoxListElementServer'
        content = item['message']
    }
    else if (item['username'] === socket.username) {
        id = 'ChatBoxListElementMe'
        content = <>
                    <span id='ChatBoxMessageText'>{item['message']}</span>
                    <span id='ChatBoxUsernameText'>: {item['username']}</span>
                  </>
    } else {
        id = 'ChatBoxListElement'
        content = item['username'] +':  '+ item['message']
    }
    return  (
        <li id={id}
            class='ChatBoxListElementClass'
            key={i}
        >  {content} </li>
    )
}

export default function ChatBox( log ) {
    return (
    <div id='ChatBox-div'>
        <div id='ChatBox'>
            <ul id='ChatBoxList'>
                {log === [] ? null :
                    log['log'].map((item,i) =>
                        determineSender(item, i)
                        // <li id={ 
                        //     determineSender(item['username'])}
                        //     className='ChatBoxListElementClass'
                        //     key={i}
                        // >{item['username'] +": "+ item['message']}</li>    
                    )
                }
            </ul>
        </div>
    </div>
    )
}
