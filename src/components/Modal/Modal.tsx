import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import ModalOverlayStyles from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalProps} from "../../domains/entity/index.entity";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const Modal = ({ onClose, title, children}: ModalProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if ((e.target as HTMLElement).classList.contains(ModalOverlayStyles.modalOverlay)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const modalsRoot = document.getElementById('modals');
    if (!modalsRoot) return null;

    return ReactDOM.createPortal(
        <>
        <ModalOverlay onClose={onClose} />
            <div className={ModalOverlayStyles.modal}>
                <div className={ModalOverlayStyles.modalHeader}>
                    <h2 className="text text_type_main-large ml-10">{title}</h2>
                    <button className={ModalOverlayStyles.closeBtn} onClick={onClose}>
                        <CloseIcon type="primary"/>
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </>,
        modalsRoot
    );
};

export default Modal;
