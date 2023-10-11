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

                    props.updateAddress(address.value);
                    userName.value = '';
                    address.value = '';
                }}>
                    <label htmlFor='NameInput'>Username:</label>
                    <input type='text' id='NameInput'/>
                    <label htmlFor='ConnectInput'>Server Address:</label>
                    <input type='text' id='ConnectInput'/>
                    <input type='submit' id='ConnectSubmit'/>
                </form>
            </div>
        </div>
    )
}