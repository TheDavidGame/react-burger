import React from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {ModalProps} from "../domains/entity/index.entity";

const Modal = ({isOpen, onClose, title, children}: ModalProps) => {
    return (
        <ModalOverlay isOpen={isOpen} onClose={onClose}>
            <div>
                <h2 className="text text_type_main-large ml-10">{title}</h2>
                <div>{children}</div>
            </div>
        </ModalOverlay>
    );
};

export default Modal;
