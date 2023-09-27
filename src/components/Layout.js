export const Layout = ({
    top: Top,
    main: Main,
    left: Left,
    bottom: Bottom,
}) => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div> 
                <Top />
            </div>
            <div style={{display: "flex"}}>
                <Main />
                <Left />
            </div>
            <div>
                <Bottom />
            </div>
        </div>
    );
}