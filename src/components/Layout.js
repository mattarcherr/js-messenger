import '../App.css'

export default function Layout({
    Top,
    Main,
    Left,
    Bottom,
    users,
    log,
    serverName
})   {
    console.log(serverName);
    return (
        <div class="grid-container">
            <div id='topbar'> 
                <Top serverName={serverName}/>
            </div>
            <div id='chatbox'>
                <Main log={log}/>
            </div>
            <div id='userlist'>
                <Left users={users}/>
            </div>
            <div id='messagebox'>
                <Bottom />
            </div>
        </div>
    );
}