import React, { memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import PopupHook from '../../../../../../utils/hooks/popup.hook';
import ModalContent from '../../../../../../components/modal-content/modal-content.component';
import AddAccountantForClientHook from '../hooks/add-accountant.hook';


export default memo(function AddAccountantForClient({ clientId, editItem, show, onHide, onSave, type, title }: any) {
    const {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose,
    } = PopupHook<any>({ [type]: '' }, onHide);

    const {
        handleSubmit,
        resetForm,
        isCheck,
        checkAccountant,
        accountant,
        errorMessage
    } = AddAccountantForClientHook(clientId, editItem, setForm, form, dispatch, setErrors, onSave,type, title)


    return (
        <ModalContent saveButtonText={(isCheck && accountant?.id == +form[type]) ? 'Պահպանել' : 'Ստուգել'} show={show} title={'Կցել ' + title}
            handleClose={() => handleClose(resetForm)}
            onSave={(isCheck && accountant?.id == +form[type]) ? handleSubmit : checkAccountant}>


            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <div className='row'>
                        <div className='col'>
                            <Form.Label>{title}</Form.Label>
                            <Form.Control
                                type='number'
                                value={form[type]}
                                onChange={e => setField(type, e.target.value)}
                                isInvalid={!!errors[type]}
                            />
                            {/* <Form.Control.Feedback type='invalid'>
                                {errors[type]}
                            </Form.Control.Feedback> */}
                        </div>
                    </div>
                    <div className='row'>
                        {accountant && <span>{type === 'accountant' ? accountant.company_name : accountant?.user?.first_name}</span>}
                        {errorMessage && <span className='error-message'>{errorMessage}</span>}
                    </div>
                </Form.Group>
            </Form>
        </ModalContent>
    )
})
