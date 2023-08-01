import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { IOrganization } from '../model/organozation.model';
import OrganizationPopupProps from '../hooks/create-organization.hook';
import PopupHook from '../../../utils/hooks/popup.hook';
import ModalContent from '../../../components/modal-content/modal-content.component';

export default memo(function AddEditOrganization({ editItem, show, onHide, onSave }: any) {
    const {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose
    } = PopupHook<IOrganization>({ name: '', hvhh: '' }, onHide);

    const {
        handleSubmit,
        resetForm
    } = OrganizationPopupProps(editItem, setForm, form, dispatch, setErrors, onSave)


    return (
        <ModalContent show={show} title={'Կազմակերպություններ'} handleClose={() => handleClose(resetForm)} onSave={handleSubmit}>
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
                            <Form.Label>ՀՎՀՀ</Form.Label>
                            <Form.Control
                                type='text'
                                value={form.hvhh}
                                onChange={e => setField('hvhh', e.target.value)}
                                isInvalid={!!errors?.hvhh}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.hvhh}
                            </Form.Control.Feedback>
                        </div>
                    </div>
                </Form.Group>
            </Form>
        </ModalContent>
    )
})
