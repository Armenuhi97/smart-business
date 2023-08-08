import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import PopupHook from '../../../utils/hooks/popup.hook';
import ModalContent from '../../../components/modal-content/modal-content.component';
import { IBroker } from '../models/broker.model';
import BrokerPopupProps from './hooks/add-edit-broker.hook';

export default memo(function AddEditBroker({ editItem, show, onHide, onSave }: any) {
    const {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose
    } = PopupHook<IBroker>({ email: '', tin: '', company_name: '', phone_number: '', password: '' }, onHide);

    const {
        handleSubmit,
        resetForm
    } = BrokerPopupProps(editItem, setForm, form, dispatch, setErrors, onSave)


    return (
        <ModalContent show={show} title={'Հաշվապահներ'} handleClose={() => handleClose(resetForm)} onSave={handleSubmit}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <div className='row'>
                        <div className='col'>
                            <Form.Label>Կազմակերպության անուն</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.company_name}
                                onChange={e => setField('name', e.target.value)}
                                isInvalid={!!errors?.company_name}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.company_name}
                            </Form.Control.Feedback>
                        </div>
                        <div className='col'>
                            <Form.Label>ՀՎՀՀ</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.tin}
                                onChange={e => setField('tin', e.target.value)}
                                isInvalid={!!errors?.tin}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.tin}
                            </Form.Control.Feedback>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col'>
                            <Form.Label>Հեռ․</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.phone_number}
                                onChange={e => setField('phone_number', e.target.value)}
                                isInvalid={!!errors?.phone_number}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.phone_number}
                            </Form.Control.Feedback>
                        </div>
                        <div className='col'>
                            <Form.Label>Էլ․ հասցե</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.email}
                                onChange={e => setField('email', e.target.value)}
                                isInvalid={!!errors?.email}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.email}
                            </Form.Control.Feedback>
                        </div>
                        <div className='col'>
                            <Form.Label>Գաղտնաբառ</Form.Label>
                            <Form.Control
                                type='password'
                                value={form.password}
                                onChange={e => setField('password', e.target.value)}
                                isInvalid={!!errors?.password}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.password}
                            </Form.Control.Feedback>
                        </div>
                    </div>
                </Form.Group>
            </Form>
        </ModalContent>
    )
})
