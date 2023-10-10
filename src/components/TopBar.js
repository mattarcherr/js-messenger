export default function MessageBox( serverName ) {
    serverName=serverName['serverName']
    return (
    <div id='TopBar-div'>
        <h1 id='TopBarTitle'>{ serverName }</h1>
    </div>
    )
}