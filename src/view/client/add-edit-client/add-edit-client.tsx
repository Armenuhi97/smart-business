import React from 'react';
import { Button, Form } from 'react-bootstrap';
import PopupHook from '../../../utils/hooks/popup.hook';
import { IUser } from '../models/user.model';
import UserPersonalProps from './hooks/add-edit-client.hook';
import MyDatePicker from '../../../components/date-picker/date-picker';
import Title from '../../../components/title/title';

function AddEditClient() {
    const {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose
    } = PopupHook<IUser>({
        firstName: '',
        lastName: '',
        phoneNumber: '', email: '',
        birthDate: ''
    });

    const {
        handleSubmit,
        resetForm,
        id,
        user
    } = UserPersonalProps(setForm, form, dispatch, setErrors);


    return (
        <div>
            {!id && <Title title='Ավելացնել հաճախորդ' isShowAdd={false} />}
            <Form className='mt-4' onSubmit={handleSubmit}>
                <Form.Group >
                    <div className='row'>
                        <div className='col'>
                            <Form.Label>Անուն</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.firstName || ''}
                                onChange={e => setField('firstName', e.target.value)}
                                isInvalid={!!errors?.firstName}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.firstName}
                            </Form.Control.Feedback>
                        </div>

                        <div className='col'>
                            <Form.Label>Ազգանուն</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.lastName || ''}
                                onChange={e => setField('lastName', e.target.value)}
                                isInvalid={!!errors?.lastName}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.lastName}
                            </Form.Control.Feedback>
                        </div>
                        <div className='col'>
                            <Form.Label>Էլ․հասցե</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.email || ''}
                                onChange={e => setField('email', e.target.value)}
                                isInvalid={!!errors?.email}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.email}
                            </Form.Control.Feedback>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col'>
                            <Form.Label>Ծննդյան ամսաթիվ</Form.Label>
                            <div>
                                <MyDatePicker wrapperClassName="datePicker" selectValue={form?.birthDate} setField={(e: Date) => setField('birthDate', e)} />
                            </div>
                        </div>
                        <div className='col'>
                            <Form.Label>Հեռախոսահամար</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.phoneNumber || ''}
                                onChange={e => setField('phoneNumber', e.target.value)}
                                isInvalid={!!errors?.phoneNumber}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.phoneNumber}
                            </Form.Control.Feedback>
                        </div>
                        {!id && <div className='col'>
                            <Form.Label>Գաղտնաբառ</Form.Label>
                            <Form.Control
                                type='password'
                                value={form.password || ''}
                                onChange={e => setField('password', e.target.value)}
                                isInvalid={!!errors?.password}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.password}
                            </Form.Control.Feedback>
                        </div>}

                    </div>
                </Form.Group>
                <div className='mt-3 justify-content-center d-flex'><Button onClick={handleSubmit}>Պահպանել</Button></div>
            </Form >
        </div>
    )
}
export default AddEditClient;