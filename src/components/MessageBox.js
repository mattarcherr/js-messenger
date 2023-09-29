import { socket } from '../socket'

export default function MessageBox() {

    const handleSend = (e) => {
        e.preventDefault();
        const msg = document.getElementById("message")
        socket.emit("msg", msg.value);
        msg.value = "";
    }

    return (
    <div style={{height: 75, width: 800}}>
        <form style={{padding: "23px 10px 0px 10px"}}>
            <input type="text" id="message" style={{width:560}} />

            <input type="submit" value="send"
             onClick={handleSend} 
             style={{width: "24.3%", marginLeft: 30}} />
            
        </form>
    </div>
    )
}
