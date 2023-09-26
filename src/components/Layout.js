import styled from 'styled-components'

const Container = styled.div`
    display: flex;
`;

const Pane = styled.div`
    flex: 1;
`;

export const Layout = ({
    main: Main,
    left: Left,
    bottom: Bottom,
}) => {
    return (
        <Container>
            <Pane>
                <Main />
            </Pane>
            <Pane>
                <Left />
            </Pane>
            <Pane>
                <Bottom />
            </Pane>
        </Container>
    );
}