import { useEffect } from "react";
import { ErrorMessage } from "../../../../utils/error";
import { IAdd, IModify } from "../../../../models/action.model";
import { IBroker } from "../../models/broker.model";
import { addBroker, modifyBroker } from "../../slice/broker.slice";

function BrokerPopupProps(editItem: IBroker | null, setForm: any, form: any, dispatch: any, setErrors: any, onSave: (evt: { isEdit: boolean }) => void) {
    useEffect(() => {
        if (!!editItem) {
            const accountant: IBroker = {
                email: editItem.email,
                phone_number: editItem.phone_number,
                tin: editItem.tin,
                company_name: editItem.company_name
            }

            setForm({
                ...form,
                ...accountant
            })
        }
    }, [editItem])

    const findFormErrors = () => {
        const { email, phone_number, tin, company_name, password } = form;
        const newErrors = {} as IBroker;
        if (!email || email.trim() === '') newErrors.email = ErrorMessage.required;
        if (!phone_number || phone_number.trim() === '') newErrors.phone_number = ErrorMessage.required;
        if (!tin || tin.trim() === '') newErrors.tin = ErrorMessage.required;
        if (!company_name || company_name.trim() === '') newErrors.company_name = ErrorMessage.required;
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
                const sendingObject: IModify<IBroker> = {
                    sendObject: {
                        ...formObject,
                    },
                    id: editObject.id,
                    updateSuccessfully: handelOnSave
                }
                dispatch(modifyBroker(
                    sendingObject
                ));
            } else {
                const sendingObject: IAdd<IBroker> = {
                    sendData: formObject,
                    createSuccessfully: handelOnSave
                }
                dispatch(addBroker(
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
            tin: '',
            company_name: '',
            password:''
        })
    }

    return {
        handleSubmit,
        resetForm
    }
}
export default BrokerPopupProps;