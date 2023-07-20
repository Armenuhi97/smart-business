import { ReactElement } from 'react';

export interface ModalProps {
    title?: string;
    children?: ReactElement;
    show: boolean;
    onSave: () => void;
    handleClose: () => void;
    saveButtonText?: string;
    text?: string;
    isShowFooter?: boolean;
}