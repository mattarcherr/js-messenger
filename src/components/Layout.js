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
        <div style={{display: "flex", flexDirection: "column"}}>
            <div> 
                <Top serverName={serverName}/>
            </div>
            <div style={{display: "flex"}}>
                <Main log={log}/>
                <Left users={users}/>
            </div>
            <div>
                <Bottom />
            </div>
        </div>
    );
}