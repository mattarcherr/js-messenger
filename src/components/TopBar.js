export default function MessageBox( serverName ) {
    console.log(serverName)
    serverName=serverName['serverName']
    return (
    <div id='TopBar-div'>
        <h1>{ serverName }</h1>
        {/* <h1>TITLE</h1> */}
    </div>
    )
}