import { socket } from '../socket'
import { useState } from 'react'



export default function UserList({ users }) {
    return (
    <div id='UserList-div'>
        <p id='UserListTitle'>Room User List</p>
        <div id='UserList'>
            {/* <ul>
                {users.length === 0 ? <li>Room Empty!</li> :
                    users.map(item =>
                        <li key={item}>{item}</li>    
                    )
                }
            </ul> */}
        </div>
    </div>
    )
}
