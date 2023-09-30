export default function ChatBox( log ) {
    console.log(log)
    return (
    <div style={{height:425,width:600,position:"relative"}}>
        <div style={{border:"2px solid black",width:"90%",height:"95%",top:"2%",left:"4%",position:"absolute"}}>
            <ul>
                {log === [] ? null :
                    log['log'].map(item =>
                        <li key={item}>{item['message']}</li>    
                    )
                }
            </ul>
        </div>
    </div>
    )
}
