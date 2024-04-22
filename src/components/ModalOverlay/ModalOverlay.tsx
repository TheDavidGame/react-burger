import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import ModalOverlayStyles from './ModalOverlay.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlayProps} from "../../domains/entity/index.entity";

const ModalOverlay = ({isOpen, onClose, children}: ModalOverlayProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if ((e.target as HTMLElement).classList.contains(ModalOverlayStyles.modalOverlay) && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={ModalOverlayStyles.modalOverlay}>
            <div className={ModalOverlayStyles.modal}>
                <div className={ModalOverlayStyles.modalHeader}>
                    <button className={ModalOverlayStyles.closeBtn} onClick={onClose}>
                        <CloseIcon type="primary"/>
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default ModalOverlay;
