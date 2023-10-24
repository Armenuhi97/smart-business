import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../../../utils/error";
import { IAdd, IModify } from "../../../models/action.model";
import { IBank } from "../model/bank.model";
import { addBank, modifyBank } from "../slice/bank.slice";
import { baseUrl } from "../../../services/API";
import { imageRegExp } from "../../../utils/image-regexp";
import { toast } from "react-toastify";
import { uploadFile } from "../../../slice/upload-file.slice";

function BankPopupProps(editItem: IBank | null, setForm: any, form: any, dispatch: any, setErrors: any, onSave: (evt: { isEdit: boolean }) => void, onUploadFile: (controlName: string, callback: (url: string) => void) => void) {
    // const params = useParams();
    // // const editItem:ICompany={} as ;
    // const navigate = useNavigate();

    useEffect(() => {
        if (!!editItem) {
            const companyObj: any = {
                name: editItem.name,
                icon: editItem.icon,
                showIcon: editItem.icon ? baseUrl + editItem.icon : '',
                file: null
            }

            setForm({
                ...form,
                ...companyObj
            })
        }
    }, [editItem])

    const findFormErrors = () => {
        const { name, showIcon } = form;
        const newErrors = {} as IBank;
        if (!name || name.trim() === '') newErrors.name = ErrorMessage.required;
        if (!showIcon || showIcon.trim() === '') newErrors.icon = ErrorMessage.required;
        return newErrors;
    }
    // const onFileChange = (e: ChangeEvent<any>) => {
    //     const files = (e.target as HTMLInputElement).files;
    //     if (!!files && files.length > 0) {
    //         const file = files[0];
    //         const fr = new FileReader();
    //         if (!imageRegExp(file)) {
    //             toast.error(ErrorMessage.formatError, {
    //                 position: toast.POSITION.TOP_RIGHT
    //             });
    //             return;
    //         }
    //         fr.onload = () => {
    //             if (typeof fr.result === 'string') {
    //                 setForm({
    //                     ...form,
    //                     file,
    //                     showIcon: fr.result
    //                 });
    //             }
    //         };
    //         fr.readAsDataURL(file);

    //     }
    // }
    // const onUploadFile = () => {
    //     const formData = new FormData();
    //     formData.append('file_url', form.file, form.file?.name);
    //     const sendingObject: IAdd<FormData> = {
    //         sendData: formData,
    //         createSuccessfully: (imageUrl: any) => {
    //             setForm({
    //                 ...form,
    //                 icon: imageUrl
    //             });
    //             sendCreateRequest(imageUrl);
    //         }
    //     }
    //     dispatch(uploadFile(sendingObject))
    // };
    const handleSubmit = (e?: any): void => {
        if (e) {
            e.preventDefault();
        }
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            if (form.file) {
                onUploadFile('icon', sendCreateRequest);
            } else {
                sendCreateRequest();
            }
        }
    }
    const sendCreateRequest = (imageUrl?: string) => {
        const formObject = {
            name: form.name,
            icon: imageUrl ? imageUrl : form.icon
        }

        if (!!editItem) {

            const editObject = editItem;
            const sendingObject: IModify<IBank> = {
                sendObject: {
                    ...formObject,
                },
                id: editObject.id,
                updateSuccessfully: handelOnSave
            }
            dispatch(modifyBank(
                sendingObject
            ));
        } else {
            const sendingObject: IAdd<IBank> = {
                sendData: formObject,
                createSuccessfully: handelOnSave
            }
            dispatch(addBank(
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
            icon: '',
            name: '',
            file: '',
            showIcon: ''
        })
    }

    return {
        handleSubmit,
        resetForm        
    }
}
export default BankPopupProps;