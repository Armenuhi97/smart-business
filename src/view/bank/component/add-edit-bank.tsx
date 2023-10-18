import React, { memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IBank } from '../model/bank.model';
import BankPopupProps from '../hooks/create-bank.hook';
import PopupHook from '../../../utils/hooks/popup.hook';
import ModalContent from '../../../components/modal-content/modal-content.component';
import * as AiIcons from "react-icons/ai";

export default memo(function AddEditBank({ editItem, show, onHide, onSave }: any) {
    const {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose
    } = PopupHook<IBank>({ name: '', icon: '', showIcon: '', file: null }, onHide);

    const {
        handleSubmit,
        resetForm,
        onFileChange
    } = BankPopupProps(editItem, setForm, form, dispatch, setErrors, onSave)


    return (
        <ModalContent show={show} title={'Բանկ'} handleClose={() => handleClose(resetForm)} onSave={handleSubmit}>
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
                            <Form.Label>Նկար</Form.Label>
                            <Form.Control
                                isInvalid={!!errors?.icon} id="image"
                                onChange={e => onFileChange(e)} type="file" size="lg" />
                            <div>  <Button className='file-item' variant="primary">
                                <label htmlFor="image">
                                    <AiIcons.AiOutlineUpload />
                                </label>
                            </Button></div>
                            {form.showIcon && <img className='bank-icon mt-2' src={form.showIcon} alt="" />}
                            <Form.Control.Feedback type='invalid'>
                                {errors.icon}
                            </Form.Control.Feedback>
                        </div>
                    </div>
                </Form.Group>
            </Form>
        </ModalContent>
    )
})
