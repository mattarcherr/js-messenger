export default function Layout({
    Top,
    Main,
    Left,
    Bottom,
    users,
    log
})   {
    // console.log(users);
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div> 
                <Top />
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