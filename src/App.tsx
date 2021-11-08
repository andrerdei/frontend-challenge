import React from 'react';
import Routes from "./routes";
import GlobalStyle from './styles/global'
import {GenericHeader} from "./components/GenericHeader";

function App() {
    return (
        <>
            <GenericHeader />
            <Routes />
            <GlobalStyle />
        </>
    );
}

export default App;
