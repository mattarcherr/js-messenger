export default function ConnectionSideBar() {
    return (
        <div id='ConnectSideBar-div'>
            <div id='ConnectSideBarTitle-div'>
                <h1 id='ConnectSideBarTitle'>Connect</h1>
            </div>
            <div id='ConnectSideBarConnections-div'>
                <form id="ConnectionsForm">
                    <label for='NameInpit'>Username:</label>
                    <input type='text' id='NameInput'/>
                    <label for='NameInpit'>Server Address:</label>
                    <input type='text' id='ConnectInput'/>
                    <input type='submit' id='ConnectSubmit'/>
                </form>
            </div>
        </div>
    )
}