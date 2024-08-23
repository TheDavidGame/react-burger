import React from 'react';
import {ModalOverlayProps} from "../../domains/entity/index.entity";
import ModalOverlayStyles from './ModalOverlay.module.css';
const ModalOverlay = ({onClose}: ModalOverlayProps) => {
    return (
        <div className={ModalOverlayStyles.modalOverlay} onClick={onClose}></div>
    );
};

export default ModalOverlay;
