export default function MessageBox(props) {
    if (props.connected)
    return (
        <div id='TopBar-div'>
            <h1 id='TopBarTitle'>{ props.serverName }</h1>
            <button onClick={() => props.disconnect() }>
                disconnect
            </button>
        </div>
    )
    else {
        return (
        <div id='TopBar-div'>
            <h1 id='TopBarTitle'>Disconnected</h1>
            <button disabled>
                disconnect
            </button>
        </div>
        )
    }
}