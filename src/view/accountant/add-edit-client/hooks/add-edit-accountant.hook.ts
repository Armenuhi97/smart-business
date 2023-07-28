import { useEffect } from "react";
import { IAccountant } from "../../models/accountant.model";
import { ErrorMessage } from "../../../../utils/error";
import { IAdd, IModify } from "../../../../models/action.model";
import { addAccountant, modifyAccountant } from "../../slice/accountant.slice";

function AccountantPopupProps(editItem: IAccountant | null, setForm: any, form: any, dispatch: any, setErrors: any, onSave: (evt: { isEdit: boolean }) => void) {
    useEffect(() => {
        if (!!editItem) {
            const accountant: IAccountant = {
                email: editItem.email,
                phone_number: editItem.phone_number,
                hvhh: editItem.hvhh,
                organization_name: editItem.organization_name
            }

            setForm({
                ...form,
                ...accountant
            })
        }
    }, [editItem])

    const findFormErrors = () => {
        const { email, phone_number, hvhh, organization_name, password } = form;
        const newErrors = {} as IAccountant;
        if (!email || email.trim() === '') newErrors.email = ErrorMessage.required;
        if (!phone_number || phone_number.trim() === '') newErrors.phone_number = ErrorMessage.required;
        if (!hvhh || hvhh.trim() === '') newErrors.hvhh = ErrorMessage.required;
        if (!organization_name || organization_name.trim() === '') newErrors.organization_name = ErrorMessage.required;
        if (!password || password.trim() === '') newErrors.password = ErrorMessage.required;
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
            const formObject = form;

            if (!!editItem) {

                const editObject = editItem;
                const sendingObject: IModify<IAccountant> = {
                    sendObject: {
                        ...formObject,
                    },
                    id: editObject.id,
                    updateSuccessfully: handelOnSave
                }
                dispatch(modifyAccountant(
                    sendingObject
                ));
            } else {
                const sendingObject: IAdd<IAccountant> = {
                    sendData: formObject,
                    createSuccessfully: handelOnSave
                }
                dispatch(addAccountant(
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
            email: '',
            phone_number: '',
            hvhh: '',
            organization_name: '',
            password:''
        })
    }

    return {
        handleSubmit,
        resetForm
    }
}
export default AccountantPopupProps;