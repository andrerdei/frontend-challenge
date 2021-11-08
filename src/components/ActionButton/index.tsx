import React, {ReactNode} from 'react'
import {StyledButton} from "./styles";

type ButtonProps = {
    type: string;
    icon: ReactNode;
    text: string;
    size: number;
    bordered?: boolean;
    onClick?: () => void;
}

export function ActionButton({type, icon, text, size, bordered, onClick}: ButtonProps) {
    return (
        <StyledButton
            className={`btn-${type}`}
            onClick={onClick}
            style={{width: size, border: bordered ? '1px solid #424242' : ''}}
        >
            {icon} {text}
        </StyledButton>
    )
}
