export default function ChatBox( log ) {
    console.log(log);
    return (
    <div id='ChatBox-div'>
        <div id='ChatBox'>
            <ul>
                {log === [] ? null :
                    log['log'].map(item =>
                        <li>{item['username'] +": "+ item['message']}</li>    
                    )
                }
            </ul>
        </div>
    </div>
    )
}
