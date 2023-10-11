import { socket } from '../App'

export default function MessageBox() {

    const handleSend = (e) => {
        e.preventDefault();
        const msg = document.getElementById("messageInput")

        if (msg.value === '') return;
        socket.emit("msg", msg.value);
        msg.value = "";
    }

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
