import React, {ReactNode} from "react";
import {Modal, Backdrop, Fade} from '@material-ui/core'
import {MainDiv} from "./styles";

type ModalCustomProps = {
    opened: boolean;
    title: string;
    subTitle?: string;
    children?: ReactNode;
    onClose: () => void;
}

export function DeleteModal({opened, title, subTitle, children, onClose}: ModalCustomProps) {
    return (
        <Modal
            open={opened}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 600}}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
        >
            <Fade>
                <MainDiv  className="modalConfirm">
                    <h2  id="transition-modal-title">{title}</h2>
                    {
                        subTitle && (<span  id="transition-modal-description">{subTitle}</span>)
                    }
                    <div className="modalContent">{children}</div>
                </MainDiv>
            </Fade>
        </Modal>
    );
}
