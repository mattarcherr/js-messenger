export default function UserList() {
    const users = this.props.users

    return (
    <div style={{height: 425, width: 200, position: "relative"}}>
        <p style={{textAlign: "center", fontSize: 20}}>Room User List</p>
        <div style={{height:"81.9%", width:"80%",border:"2px solid black",   position: "absolute", top: "15%", left: "12%"}}>
            <ul>
                {users.length === 0 ? <li>Room Empty!</li> :
                    users.map(item =>
                        <li key={item}>{item}</li>    
                    )
                }
            </ul>
        </div>
    </div>
    )
}
