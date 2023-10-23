import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { IEmployeeObjectType } from '../model/employee.model';
import PopupHook from '../../../../../../utils/hooks/popup.hook';
import ModalContent from '../../../../../../components/modal-content/modal-content.component';
import EmployeePopupProps from '../hooks/create-employee.hook';

export default memo(function AddEditEmployee({ editItem, show, onHide, onSave }: any) {
    const {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose
    } = PopupHook<IEmployeeObjectType>({ name: '', surname: '', email: '', phoneNumber: '', password: '' }, onHide);

    const {
        handleSubmit,
        resetForm
    } = EmployeePopupProps(editItem, setForm, form, dispatch, setErrors, onSave)


    return (
        <ModalContent show={show} title={'Աշխատակիցներ'} handleClose={() => handleClose(resetForm)} onSave={handleSubmit}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <div className='row'>
                        <div className='col'>
                            <Form.Label>Անուն</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.name}
                                onChange={e => setField('name', e.target.value)}
                                isInvalid={!!errors?.name}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.name}
                            </Form.Control.Feedback>
                        </div>
                        <div className='col'>
                            <Form.Label>Ազգանուն</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.surname}
                                onChange={e => setField('surname', e.target.value)}
                                isInvalid={!!errors?.surname}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.surname}
                            </Form.Control.Feedback>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col'>
                            <Form.Label>Հեռ․</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.phoneNumber}
                                onChange={e => setField('phoneNumber', e.target.value)}
                                isInvalid={!!errors?.phoneNumber}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.phoneNumber}
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
                                type='text'
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
