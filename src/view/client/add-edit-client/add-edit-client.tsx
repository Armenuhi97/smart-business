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
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
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
                                value={form.first_name || ''}
                                onChange={e => setField('first_name', e.target.value)}
                                isInvalid={!!errors?.first_name}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.first_name}
                            </Form.Control.Feedback>
                        </div>

                        <div className='col'>
                            <Form.Label>Ազգանուն</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.last_name || ''}
                                onChange={e => setField('last_name', e.target.value)}
                                isInvalid={!!errors?.last_name}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.last_name}
                            </Form.Control.Feedback>
                        </div>

                    </div>
                    <div className='row mt-2'>
                        {/* <div className='col'>
                            <Form.Label>Ծննդյան ամսաթիվ</Form.Label>
                            <div>
                                <MyDatePicker wrapperClassName="datePicker" selectValue={form?.birth_date} setField={(e: Date) => setField('birth_date', e)} />
                            </div>
                        </div> */}
                        <div className='col'>
                            <Form.Label>Էլ․հասցե</Form.Label>
                            <Form.Control
                                type='email'
                                value={form.email || ''}
                                onChange={e => setField('email', e.target.value)}
                                isInvalid={!!errors?.email}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.email}
                            </Form.Control.Feedback>
                        </div>
                        <div className='col'>
                            <Form.Label>Հեռախոսահամար</Form.Label>
                            <Form.Control
                                type='tel'
                                value={form.phone_number || ''}
                                onChange={e => setField('phone_number', e.target.value)}
                                isInvalid={!!errors?.phone_number}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.phone_number}
                            </Form.Control.Feedback>
                        </div>
                        {/* {!id && <div className='col'>
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
                        </div>} */}

                    </div>
                </Form.Group>
                <div className='mt-3 justify-content-center d-flex'><Button onClick={handleSubmit}>Պահպանել</Button></div>
            </Form>
        </div>
    )
}
export default AddEditClient;