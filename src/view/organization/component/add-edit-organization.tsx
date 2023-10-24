import React, { memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IOrganization } from '../model/organozation.model';
import OrganizationPopupProps from '../hooks/create-organization.hook';
import PopupHook from '../../../utils/hooks/popup.hook';
import ModalContent from '../../../components/modal-content/modal-content.component';
import * as AiIcons from "react-icons/ai";
import Multiselect from 'multiselect-react-dropdown';
import { UserDetail } from '../../client/models/user.model';

export default memo(function AddEditOrganization({ editItem, show, onHide, onSave }: any) {
    const {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose,
        onUploadFile,
        setFormArray,
        deleteItemFormFormArray,
        onFileChange
    } = PopupHook<IOrganization>({ name: '', hvhh: '', image: '', showImage: '', file: null, address: [], managers: [] }, onHide);

    const {
        handleSubmit,
        resetForm,
        managers
    } = OrganizationPopupProps(editItem, setForm, form, dispatch, setErrors, onSave, onUploadFile)


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
                            <Form.Label>Նկար</Form.Label>
                            <Form.Control
                                isInvalid={!!errors?.image} id="image"
                                onChange={e => onFileChange(e, 'showImage')} type="file" size="lg" />
                            <div className='d-flex align-items-center'>
                                <Button className='file-item' variant="primary">
                                    <label htmlFor="image">
                                        <AiIcons.AiOutlineUpload />
                                    </label>
                                </Button>
                                {form.showImage && <img className='bank-icon mx-2' src={form.showImage} alt="" />}
                            </div>

                            <Form.Control.Feedback type='invalid'>
                                {errors.image}
                            </Form.Control.Feedback>
                        </div>

                        <div className='col'>
                            <div className='d-flex align-items-center'>
                                <Form.Label className='mb-0'>Հասցեներ</Form.Label>
                                <div className='mx-2'>
                                    <Button className='add-btn' onClick={() => {
                                        setField('address', { name: '' }, true)
                                    }}>+</Button>
                                </div>
                            </div>
                            {
                                !!form.address?.length && form.address.map((el, index) => {

                                    return <div className='mt-2 d-flex align-items-center' key={index}>
                                        <Form.Control
                                            type='string'
                                            value={el?.name || ''}
                                            onChange={e => setFormArray('address', { name: e.target.value }, index)}
                                            maxLength={255}
                                        // isInvalid={!!el}
                                        />
                                        <span className='action-btn red mx-2'> <AiIcons.AiOutlineDelete onClick={() => deleteItemFormFormArray('address', index)} /></span>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col'>
                            <Form.Label>Մենեջերներ</Form.Label>

                            {managers?.length && <Multiselect
                                hidePlaceholder={true}
                                className={errors?.managers ? 'invalid' : ''}
                                options={managers}
                                selectedValues={
                                    managers?.filter((user: UserDetail) => form.managers?.some((select: UserDetail) => +select === +user.id
                                    ))}
                                onSelect={(e) => {
                                    setField('managers', e, true)
                                }}
                                onRemove={(e) => {
                                    setField('managers', e, true)
                                }}
                                displayValue="phone_number"
                            />}

                        </div>
                    </div>
                </Form.Group>
            </Form>
        </ModalContent>
    )
})
