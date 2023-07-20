import React, { memo } from 'react';
import ModalContent from '../modal-content/modal-content.component';
import { ModalProps } from '../../models/modal-props.model';
export default memo(function DeleteConfirmModal(props: ModalProps) {
    return (
        <ModalContent show={props.show} saveButtonText={'Ջնջել'} title={'Դուք վստա՞հ եք'} handleClose={props.handleClose} onSave={props.onSave}>
            <span>{props.text}</span>
        </ModalContent>
    )
})
