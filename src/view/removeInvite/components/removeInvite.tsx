import React, { memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import ModalContent from '../../../components/modal-content/modal-content.component';
import InvitePopupProps from './hooks/invite.popup.hooks';

export default memo(function RemoveInvite({ editItem, show, onHide, onSave }: any) {

    const {
        changeInviteStatus,
    } = InvitePopupProps(editItem, onSave)

    return (
        <ModalContent show={show} isShowFooter={true} handleClose={onHide}>
            <div className='d-flex align-items-center justify-content-center'>
                <Button onClick={() => changeInviteStatus('accepted')} className="mx-2">Ջնջել հաճախորդին</Button>
                <Button onClick={() => changeInviteStatus('rejected')} className="mx-2">Չեղարկել հայտը</Button>
            </div>
        </ModalContent>
    )
})

