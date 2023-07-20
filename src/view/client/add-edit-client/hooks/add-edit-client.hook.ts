import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../models/user.model";
import { ErrorMessage } from "../../../../utils/error";
import { IAdd, IModify } from "../../../../models/action.model";

function UserPersonalProps(setForm: any, form: any, dispatch: any, setErrors: any, onSave?: (evt: { isEdit: boolean }) => void) {
    const params = useParams();
    // const user = useAppSelector((state) => state.userById.user);
    const navigate = useNavigate();
    const [user, setUser] = useState({} as IUser);


    useEffect(() => {
        if (!!params?.id) {
            // dispatch(getUserById(+params!.id!)).then((data: any) => {
            //     setUser(data.payload.user);
            // });
        }
    }, [params.id]);

    useEffect(() => {
        if (!!user && params.id) {
            const obj: IUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                birthDate: user.birthDate
            }

            setForm({
                ...form,
                ...obj
            })
        }
    }, [user, params.id])

    const findFormErrors = () => {
        const { firstName, lastName, phoneNumber, email, password } = form;
        const newErrors = {} as IUser;
        if (!firstName || firstName.trim() === '') newErrors.firstName = ErrorMessage.required;
        if (!lastName || lastName.trim() === '') newErrors.lastName = ErrorMessage.required;
        if (!phoneNumber || phoneNumber.trim() === '') newErrors.phoneNumber = ErrorMessage.required;
        if (!email || email.trim() === '') newErrors.email = ErrorMessage.required;
        if (!params.id) {
            if (!password || password.trim() === '') newErrors.password = ErrorMessage.required;
        }

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
                ...form,
                role: params.roleId
            }
            if (!!params.id) {

                const editObject = user;
                const sendingObject: IModify<IUser> = {
                    sendObject: {
                        ...formObject
                    },
                    id: editObject.id,
                    updateSuccessfully: handelOnSave
                }
                // dispatch(modifyUser(
                //     sendingObject
                // ));
            } else {
                const sendingObject: IAdd<IUser> = {
                    sendData: formObject,
                    createSuccessfully: handelOnSave
                }
                // dispatch(addUser(
                //     sendingObject
                // ))
            }


        }
    }

    const handelOnSave = (): void => {
        resetForm();
        navigate({
            pathname: `dashboard/users/${params.roleId}`
        });
    }

    const resetForm = () => {
        setForm({
            title: '', description: '', logo: '', logoFile: null,
            user: []
        })
    }

    return {
        handleSubmit,
        resetForm,
        user,
        id: params.id,
    }
}
export default UserPersonalProps;