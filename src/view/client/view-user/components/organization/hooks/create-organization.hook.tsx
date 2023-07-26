import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IOrganization } from "../model/organozation.model";
import { addOrganization, getOrganizationById, modifyOrganization } from "../slice/organization.slice";
import { ErrorMessage } from "../../../../../../utils/error";
import { IAdd, IModify } from "../../../../../../models/action.model";

function OrganizationPopupProps(editItem: IOrganization | null, setForm: any, form: any, dispatch: any, setErrors: any, onSave: (evt: { isEdit: boolean }) => void) {
    const params = useParams();
    // const editItem:ICompany={} as ;
    const navigate = useNavigate();


    useEffect(() => {
        if (!!editItem) {
            const companyObj: any = {
                name: editItem.name,
                hvhh: editItem.hvhh
            }

            setForm({
                ...form,
                ...companyObj
            })
        }
    }, [editItem])

    const findFormErrors = () => {
        const { name, hvhh } = form;
        const newErrors = {} as IOrganization;
        if (!name || name.trim() === '') newErrors.name = ErrorMessage.required;
        if (!hvhh || hvhh.trim() === '') newErrors.hvhh = ErrorMessage.required;
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
            const formObject = {
                name: form.name,
                hvhh: form.hvhh
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
            title: '', description: '', logo: '', logoFile: null,
            categories: []
        })
    }

    return {
        handleSubmit,
        resetForm
    }
}
export default OrganizationPopupProps;