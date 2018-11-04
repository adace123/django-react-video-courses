import * as React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled('h2')`
    text-align: center;
    margin-top: 40vh;
`;

const ErrorPage: React.StatelessComponent<{}> = () => {
    return (
        <ErrorMessage>404 Error</ErrorMessage>
    );
}

export default ErrorPage;