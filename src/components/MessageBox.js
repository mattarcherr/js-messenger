import { socket } from '../socket'
import { Fragment } from 'react';

export default function MessageBox() {

    const handleSend = (e) => {
        e.preventDefault();
        const msg = document.getElementById("message")
        socket.emit("msg", msg.value);
        msg.value = "";
    }

    return (
    <div id='MessageBox-div'>
        <form>
            <input type="text" id="message"/>

            <input type="submit" value="send"
             onClick={handleSend} 
            />
        </form>
    </div>
    )
}
