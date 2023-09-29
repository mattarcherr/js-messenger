export default function Layout({
    Top,
    Main,
    Left,
    Bottom,
    users
})   {
    // console.log(users);
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div> 
                <Top />
            </div>
            <div style={{display: "flex"}}>
                <Main />
                <Left users={users}/>
            </div>
            <div>
                <Bottom />
            </div>
        </div>
    );
}