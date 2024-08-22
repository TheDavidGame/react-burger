import React from 'react';
import Modal from '../Modal/Modal';
import {ModalOverlayProps} from "../../domains/entity/index.entity";

const ModalOverlay = ({isOpen, onClose, title, children}: ModalOverlayProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h2 className="text text_type_main-large ml-10">{title}</h2>
                <div>{children}</div>
            </div>
        </Modal>
    );
};

export default ModalOverlay;
