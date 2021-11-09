import React from 'react';
import Routes from "./routes";
import {BrowserRouter} from 'react-router-dom'
import GlobalStyle from './styles/global'
import {GenericHeader} from "./components/GenericHeader";
import {GenericFooter} from "./components/GenericFooter";

function App() {
    return (
        <BrowserRouter>
            <div className="pre-loader-div">
                <img
                    src="/pre_loader_1.gif"
                    alt="Pre loader gif"
                    className="pre-loader-image"
                />
            </div>

            <GenericHeader />
            <Routes />
            <GlobalStyle />
            <GenericFooter />
        </BrowserRouter>
    );
}

export default App;
