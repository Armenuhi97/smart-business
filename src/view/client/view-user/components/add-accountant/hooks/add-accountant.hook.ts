import { IAdd } from "../../../../../../models/action.model";
import { ErrorMessage } from "../../../../../../utils/error";
import { IAddAccountant } from "../../../../models/add-accountant.model";
import { addAccountantForClient } from "../../../../slice/all-clients.slice";

function AddAccountantForClientHook(clientId: number, editItem: any, setForm: any, form: any, dispatch: any, setErrors: any, onSave: (evt: { isEdit: boolean }) => void) {
    // useEffect(() => {
    //     if (!!editItem) {
    //         const companyObj: any = {
    //             name: editItem.name,
    //             tin: editItem.tin,
    //             image: editItem.image,
    //             showImage: editItem.image ? baseUrl + editItem.image : '',
    //             file: null,
    //             address: editItem.address || [],
    //             managers: editItem.managers || []
    //         }

    //         setForm({
    //             ...form,
    //             ...companyObj
    //         })
    //     }
    // }, [editItem]);

    const findFormErrors = () => {
        const { accountant } = form;
        const newErrors = {} as { accountant: string };
        if (!accountant || accountant.trim() === '') newErrors.accountant = ErrorMessage.required;
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
                accountant: +form.accountant,
                client: clientId
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
        // setTimeout(() => {
        //     navigate({
        //         pathname: '/dashboard/company'
        //     });
        // });
        onSave({ isEdit: !!editItem })
    }

    const resetForm = () => {
        setForm({
            accountant: ''
        })
    }

    return {
        handleSubmit,
        resetForm
    }
}
export default AddAccountantForClientHook;