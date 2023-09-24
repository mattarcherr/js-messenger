export const SplitScreen = ({
    main: Main,
    left: Left,
    bottom: Bottom,
}) => {
    return (
        <div>
            <div>
                <Main />
            </div>
            <div>
                <Left />
            </div>
            <div>
                <Bottom />
            </div>
        </div>
    );
}