import { useEffect } from "react";
import { IEmployeeObjectType } from "../model/employee.model";
import { ErrorMessage } from "../../../../../../utils/error";
import { IAdd, IModify } from "../../../../../../models/action.model";
import { addEmployee, modifyEmployee } from "../slice/employee.slice";

function EmployeePopupProps(editItem: IEmployeeObjectType | null, setForm: any, form: any, dispatch: any, setErrors: any, onSave: (evt: { isEdit: boolean }) => void) {
    useEffect(() => {
        if (!!editItem) {
            const companyObj: any = {
                name: editItem.name,
                surname: editItem.surname,
                email: editItem.email,
                phoneNumber: editItem.phoneNumber
            }

            setForm({
                ...form,
                ...companyObj
            })
        }
    }, [editItem])

    const findFormErrors = () => {
        const { name, surname, email, phoneNumber, password } = form;
        const newErrors = {} as IEmployeeObjectType;
        if (!name || name.trim() === '') newErrors.name = ErrorMessage.required;
        if (!surname || surname.trim() === '') newErrors.surname = ErrorMessage.required;
        if (!email || email.trim() === '') newErrors.email = ErrorMessage.required;
        if (!phoneNumber || phoneNumber.trim() === '') newErrors.phoneNumber = ErrorMessage.required;
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
                const sendingObject: IModify<IEmployeeObjectType> = {
                    sendObject: {
                        ...formObject,
                    },
                    id: editObject.id,
                    updateSuccessfully: handelOnSave
                }
                dispatch(modifyEmployee(
                    sendingObject
                ));
            } else {
                const sendingObject: IAdd<IEmployeeObjectType> = {
                    sendData: formObject,
                    createSuccessfully: handelOnSave
                }
                dispatch(addEmployee(
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
            name: '',
            surname: '',
            email: '',
            phoneNumber: ''
        })
    }

    return {
        handleSubmit,
        resetForm
    }
}
export default EmployeePopupProps;