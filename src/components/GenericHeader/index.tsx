import React from 'react';
import {MainDiv} from "./styles";
import {Router, useHistory} from "react-router-dom";

export function GenericHeader() {
    const history = useHistory();

    function handleClick() {
        history.push("/");
    }

    return (
        <MainDiv>
                <div className="imgContainer">
                    <img src="/logo.png" alt="Gofind" onClick={handleClick}/>
                </div>
        </MainDiv>
    );
}
