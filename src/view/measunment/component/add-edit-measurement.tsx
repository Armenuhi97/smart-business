import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import PopupHook from '../../../utils/hooks/popup.hook';
import ModalContent from '../../../components/modal-content/modal-content.component';
import MeasurementPopupProps from '../hooks/create-measurement';
import { IMeasurement } from '../model/measurement.model';

export default memo(function AddEditMeasurement({ editItem, show, onHide, onSave }: any) {
    const {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose,
        onUploadFile,
        onFileChange
    } = PopupHook<IMeasurement>({ name: '' }, onHide);

    const {
        handleSubmit,
        resetForm,
    } = MeasurementPopupProps(editItem, setForm, form, dispatch, setErrors, onSave, onUploadFile)


    return (
        <ModalContent show={show} title={'Չափումներ'} handleClose={() => handleClose(resetForm)} onSave={handleSubmit}>
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

                    </div>
                </Form.Group>
            </Form>
        </ModalContent>
    )
})
