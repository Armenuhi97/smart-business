import React, { memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import PopupHook from '../../../../../../utils/hooks/popup.hook';
import ModalContent from '../../../../../../components/modal-content/modal-content.component';
import AddAccountantForClientHook from '../hooks/add-accountant.hook';


export default memo(function AddAccountantForClient({clientId, editItem, show, onHide, onSave }: any) {
    const {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose,
    } = PopupHook<{ accountant: '' }>({ accountant: '' }, onHide);

    const {
        handleSubmit,
        resetForm,
    } = AddAccountantForClientHook(clientId,editItem, setForm, form, dispatch, setErrors, onSave)


    return (
        <ModalContent show={show} title={'Կցել հաշվապահ'} handleClose={() => handleClose(resetForm)} onSave={handleSubmit}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <div className='row'>
                        <div className='col'>
                            <Form.Label>Հաշվապահ</Form.Label>
                            <Form.Control
                                type='number'
                                value={form.accountant}
                                onChange={e => setField('accountant', e.target.value)}
                                isInvalid={!!errors?.accountant}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.accountant}
                            </Form.Control.Feedback>
                        </div>                       
                    </div>                    
                </Form.Group>
            </Form>
        </ModalContent>
    )
})
