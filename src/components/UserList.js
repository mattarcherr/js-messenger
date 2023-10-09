import { socket } from '../socket'
import { useState } from 'react'



export default function UserList({ users }) {
    return (
    <div id='UserList-div'>
        <div id='UserListTitle-div'>
            <p id='UserListTitle'>Room User List</p>
        </div>
        <div id='UserList'>
            <ul id='UserListList'>
                {users.length === 0 ? <li>Room Empty!</li> :
                    users.map(item =>
                        <li id='UserListElement'>{item}</li>    
                    )
                }
            </ul>
        </div>
    </div>
    )
}
