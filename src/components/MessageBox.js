import { socket } from '../App'

export default function MessageBox(props) {

    const handleSend = (e) => {
        e.preventDefault();
        const msg = document.getElementById("messageInput")

        if (msg.value === '') return;
        if (props.selRoom === 'Main Room') {
            socket.emit("msg", msg.value);
        } else {
            socket.emit('private message', {recipientName: props.selRoom, msg: msg.value});
        }
        msg.value = "";
    }

    if (props.connected) {
    return (
    <div id='MessageBox-div'>
        <form id='submitForm'>
            <input type="text" id="messageInput"/>

            <input type="submit" value="send" id='sendButton'
             onClick={handleSend} 
            />
        </form>
    </div>
    )
    }
    else return (
        <div id='MessageBox-div'>
        <form id='submitForm'>
            <input type="text" id="messageInput"/>

            <input type="submit" value="send" id='sendButton'
             disabled onClick={handleSend} 
            />
        </form>
    </div>
    )
}
