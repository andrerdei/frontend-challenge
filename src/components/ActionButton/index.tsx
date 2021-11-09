import React, {ReactNode} from 'react'
import {StyledButton} from "./styles";

type ButtonProps = {
    type: string;
    icon?: ReactNode;
    text: string;
    size: number;
    height?: number;
    color: string;
    background?: string;
    bordered?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export function ActionButton({type, icon, text, size, height, color, background, bordered, disabled, onClick}: ButtonProps) {
    return (
        <StyledButton
            className={`btn-${type}`}
            onClick={onClick}
            style={{width: size, height: height, border: bordered ? '1px solid #424242' : '', color: color, backgroundColor: background}}
            disabled={disabled}
        >
            {icon} {text}
        </StyledButton>
    )
}
