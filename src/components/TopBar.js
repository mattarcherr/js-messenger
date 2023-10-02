export default function MessageBox( serverName ) {
    serverName=serverName['serverName']
    console.log(serverName);
    return (
    <div style={{height: 75, width: 800}}>
        <h1>{ serverName }</h1>
    </div>
    )
}