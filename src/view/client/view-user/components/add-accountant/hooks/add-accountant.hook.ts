import { useState } from "react";
import { IAdd } from "../../../../../../models/action.model";
import { ErrorMessage } from "../../../../../../utils/error";
import { IAddAccountant } from "../../../../models/add-accountant.model";
import { addAccountantForClient } from "../../../../slice/all-clients.slice";
import { UserDetail } from "../../../../models/user.model";
import { getUserDetails } from "../../../../slice/client.slice";

function AddAccountantForClientHook(clientId: number, editItem: any, setForm: any,
    form: any, dispatch: any, setErrors: any, onSave: (evt: { isEdit: boolean }) => void, type: string, title: string) {
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [accountant, setAccountant] = useState<UserDetail | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const findFormErrors = () => {
        const newErrors = {} as any;
        if (!form[type]) newErrors[type] = ErrorMessage.required;
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
            const formObject: IAddAccountant = {
                accountant: type === 'accountant' ? +form[type] : clientId,
                client: type === 'accountant' ? clientId : +form[type]
            }

            // if (!!editItem) {

            // const editObject = editItem;
            // const sendingObject = {
            //     sendObject: {
            //         ...formObject,
            //     },
            //     id: editObject.id,
            //     updateSuccessfully: handelOnSave
            // }
            // dispatch(addAccountant(
            //     sendingObject
            // ));
            // } else {
            const sendingObject: IAdd<IAddAccountant> = {
                sendData: formObject,
                createSuccessfully: handelOnSave
            }
            dispatch(addAccountantForClient(
                sendingObject
            ))
            // }
        }
    }

    const handelOnSave = (): void => {
        resetForm();
        onSave({ isEdit: !!editItem })
    }
    const checkAccountant = (): void => {
        if (!form[type]) {
            return;
        }
        dispatch(getUserDetails(form[type])).then((data: any) => {
            if (data.error) {
                setErrorMessage(`Նման ${title} գոյություն չունի`);
                setAccountant(null);
                setIsCheck(false);
            }
            if (data.payload) {
                setErrorMessage('');
                setIsCheck(true);
                setAccountant(data.payload);
            }
        })
    }
    const resetForm = () => {
        setForm({
            [type]: ''
        });
        setIsCheck(false);
        setAccountant(null);
        setErrorMessage('');
    }

    return {
        handleSubmit,
        resetForm,
        isCheck,
        checkAccountant,
        accountant,
        errorMessage
    }
}
export default AddAccountantForClientHook;