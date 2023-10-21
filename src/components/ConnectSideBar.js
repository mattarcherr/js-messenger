export default function ConnectionSideBar(props) {
    return (
        <div id='ConnectSideBar-div'>
            <div id='ConnectSideBarTitle-div'>
                <h1 id='ConnectSideBarTitle'>Connect</h1>
            </div>
            <div id='ConnectSideBarConnections-div'>
                <form id="ConnectionsForm" onSubmit={(e) => {
                    e.preventDefault();
                    var userName = document.getElementById('NameInput');
                    var address = document.getElementById('ConnectInput');

                    props.connect(address.value, userName.value);
                    userName.value = '';
                    address.value = '';
                }}>
                    <label htmlFor='NameInput'>Username:</label>
                    <input type='text' id='NameInput' required/>
                    <label htmlFor='ConnectInput'>Server Address:</label>
                    <input type='text' id='ConnectInput' required/>
                    <input type='submit' id='ConnectSubmit'/>
                </form>
                <div id='ConnectSideBarRooms-div'>
                    <ul id='UserListList'>
                        {props.rooms.length === 0 ? <li>No rooms</li> :
                        props.rooms.map( (item,index) => 
                            <li id='UserListElement'
                                key={index}
                                style={ item === props.selRoom ? {} : {backgroundColor: '#bbbbbb'} }
                                onClick={() => {
                                    props.setSelRoom(item);
                                }}
                            >{item}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}