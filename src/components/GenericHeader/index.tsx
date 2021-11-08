import React from 'react';
import {MainDiv} from "./styles";

export function GenericHeader() {
    return (
        <MainDiv className="headerContainer">
            <div className="imgContainer">
                <img src="/logo.png" alt="Gofind" />
            </div>
        </MainDiv>
    );
}
