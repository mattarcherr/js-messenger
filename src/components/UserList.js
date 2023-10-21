export default function UserList(props) {
    function ifUserIsMe(item,i) {
        if (props.id === item['id']) {
            return <li id='UserListElement' key={i}>{item['userName']} (you)</li>
        }
        else {
            return <li id='UserListElement' key={i}>{item['userName']}
            <button id='UserListElementButton' onClick={() => {
                if (!props.rooms.includes(item['userName'])) {
                    props.joinPrivateRoom(item['userName']);
                }
            }}>message</button></li>
        } 
    }

    return (
    <div id='UserList-div'>
        <div id='UserListTitle-div'>
            <p id='UserListTitle'>Room User List</p>
        </div>
        <div id='UserList'>
            <ul id='UserListList'>
                {props.users.length === 0 ? <li>Room Empty!</li> :
                    props.users.map((item,i) =>
                        ifUserIsMe(item,i)   
                    )
                }
            </ul>
        </div>
        <div id='UserListBottom-div' />
    </div>
    )
}
