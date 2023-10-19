export default function UserList(props) {
    function ifUserIsMe(item) {
        if (props.id === item['id']) {
            return <li id='UserListElement'>{item['userName']} (you)</li>
        }
        else {
            return <li id='UserListElement'>{item['userName']}
            <button id='UserListElementButton' onClick={() => {
                console.log(item['id'])
                props.joinPrivateRoom(item['userName']);
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
                    props.users.map(item =>
                        ifUserIsMe(item)   
                    )
                }
            </ul>
        </div>
        <div id='UserListBottom-div' />
    </div>
    )
}
