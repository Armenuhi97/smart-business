import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../../../utils/error";
import { IAdd, IModify } from "../../../models/action.model";
import { baseUrl } from "../../../services/API";
import { imageRegExp } from "../../../utils/image-regexp";
import { toast } from "react-toastify";
import { uploadFile } from "../../../slice/upload-file.slice";
import { IMeasurement } from "../model/measurement.model";
import { addMeasurement, modifyMeasurement } from "../slice/measurement.slice";

function MeasurementPopupProps(editItem: IMeasurement | null, setForm: any, form: any, dispatch: any, setErrors: any, onSave: (evt: { isEdit: boolean }) => void, onUploadFile: (controlName: string, callback: (url: string) => void) => void) {
    // const params = useParams();
    // // const editItem:ICompany={} as ;
    // const navigate = useNavigate();

    useEffect(() => {
        if (!!editItem) {
            const companyObj: any = {
                name: editItem.name
            }

            setForm({
                ...form,
                ...companyObj
            })
        }
    }, [editItem])

    const findFormErrors = () => {
        const { name } = form;
        const newErrors = {} as IMeasurement;
        if (!name || name.trim() === '') newErrors.name = ErrorMessage.required;
        return newErrors;
    }

    const handleSubmit = (e?: any): void => {
        if (e) {
            e.preventDefault();
        }
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            sendCreateRequest();
        }
    }
    const sendCreateRequest = (imageUrl?: string) => {
        const formObject = {
            name: form.name,
            icon: imageUrl ? imageUrl : form.icon
        }

        if (!!editItem) {

            const editObject = editItem;
            const sendingObject: IModify<IMeasurement> = {
                sendObject: {
                    ...formObject,
                },
                id: editObject.id,
                updateSuccessfully: handelOnSave
            }
            dispatch(modifyMeasurement(
                sendingObject
            ));
        } else {
            const sendingObject: IAdd<IMeasurement> = {
                sendData: formObject,
                createSuccessfully: handelOnSave
            }
            dispatch(addMeasurement(
                sendingObject
            ))
        }
    }
    const handelOnSave = (): void => {
        resetForm();
        onSave({ isEdit: !!editItem })
    }

    const resetForm = () => {
        setForm({
            name: ''
        })
    }

    return {
        handleSubmit,
        resetForm
    }
}
export default MeasurementPopupProps;