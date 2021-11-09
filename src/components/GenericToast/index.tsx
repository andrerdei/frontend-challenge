import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {Collapse, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

type GenericToastProps = {
    type: 'success' | 'warning' | 'error' | 'info';
    open: boolean;
    message: string;
    close: () => void;
}

export function GenericToast({type, open, message, close}: GenericToastProps) {
    return (
        <Collapse in={open}>
            <Alert
                severity={type}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            close()
                        }}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Collapse>
    );
}
