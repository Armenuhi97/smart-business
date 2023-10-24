import React, { useState } from "react";
import { useEffect } from "react";
import { IOrganization } from "../model/organozation.model";
import { ErrorMessage } from "../../../utils/error";
import { baseUrl } from "../../../services/API";
import { IAdd, IModify } from "../../../models/action.model";
import { addOrganization, modifyOrganization } from "../slice/organization.slice";
import { UserDetail } from "../../client/models/user.model";

function OrganizationPopupProps(editItem: IOrganization | null, setForm: any, form: any, dispatch: any, setErrors: any, onSave: (evt: { isEdit: boolean }) => void, onUploadFile: (controlName: string, callback: (url: string) => void) => void) {
    const [managers, setManagers] = useState<UserDetail[]>();
    const [accountant, setAccountant] = useState<UserDetail[]>();

    // useEffect(() => {
    //     getAllManagers();
    // }, []);
    useEffect(() => {
        if (!!editItem) {
            const companyObj: any = {
                name: editItem.name,
                tin: editItem.tin,
                image: editItem.image,
                showImage: editItem.image ? baseUrl + editItem.image : '',
                file: null,
                address: editItem.address || [],
                managers: editItem.managers || []
            }

            setForm({
                ...form,
                ...companyObj
            })
        }
    }, [editItem]);

    const findFormErrors = () => {
        const { name, tin, showImage } = form;
        const newErrors = {} as IOrganization;
        if (!name || name.trim() === '') newErrors.name = ErrorMessage.required;
        if (!tin || tin.trim() === '') newErrors.tin = ErrorMessage.required;
        // if (!showImage || showImage.trim() === '') newErrors.image = ErrorMessage.required;

        return newErrors;
    }
    // const getAllManagers = () => {
    //     dispatch(getManagers()).then((data: any) => {
    //         setManagers(data.payload);

    //     })
    // }
    const getAllAccountant = () => {
        dispatch(getAllAccountant()).then((data: any) => {
            setAccountant(data.payload);
        })
    }
    const handleSubmit = (e?: any): void => {
        if (e) {
            e.preventDefault();
        }

        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            const formObject = {
                name: form.name,
                tin: form.tin
            }

            if (!!editItem) {

                const editObject = editItem;
                const sendingObject: IModify<IOrganization> = {
                    sendObject: {
                        ...formObject,
                    },
                    id: editObject.id,
                    updateSuccessfully: handelOnSave
                }
                dispatch(modifyOrganization(
                    sendingObject
                ));
            } else {
                const sendingObject: IAdd<IOrganization> = {
                    sendData: formObject,
                    createSuccessfully: handelOnSave
                }
                dispatch(addOrganization(
                    sendingObject
                ))
            }
        }
    }

    const handelOnSave = (): void => {
        resetForm();
        // setTimeout(() => {
        //     navigate({
        //         pathname: '/dashboard/company'
        //     });
        // });
        onSave({ isEdit: !!editItem })
    }

    const resetForm = () => {
        setForm({
            name: '', hvhh: '', image: '', showImage: '', file: null
        })
    }

    return {
        handleSubmit,
        resetForm,
        managers
    }
}
export default OrganizationPopupProps;