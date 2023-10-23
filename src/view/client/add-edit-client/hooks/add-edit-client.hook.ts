import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser, UserDetail } from "../../models/user.model";
import { ErrorMessage } from "../../../../utils/error";
import { IAdd, IModify } from "../../../../models/action.model";
import { getUserDetails } from "../../slice/client.slice";

function UserPersonalProps(setForm: any, form: any, dispatch: any, setErrors: any, onSave?: (evt: { isEdit: boolean }) => void) {
    const params = useParams();
    // const user = useAppSelector((state) => state.userById.user);
    const navigate = useNavigate();
    const [user, setUser] = useState({} as UserDetail);


    useEffect(() => {
        if (!!params?.id) {
            dispatch(getUserDetails(+params!.id!)).then((data: any) => {                
                setUser(data.payload);
            });
        }
    }, [params.id]);

    useEffect(() => {
        if (!!user?.id && params.id) {            
            const obj: IUser = {
                first_name: user.user.first_name,
                last_name: user.user.last_name,
                email: user.user.email,
                phone_number: user.phone_number,
                birth_date: new Date(user.birth_date)
            }
            setForm({
                ...form,
                ...obj
            })
        }
    }, [user, params.id])

    const findFormErrors = () => {
        const { first_name, last_name, phone_number, email, password } = form;
        const newErrors = {} as IUser;
        if (!first_name || first_name.trim() === '') newErrors.first_name = ErrorMessage.required;
        if (!last_name || last_name.trim() === '') newErrors.last_name = ErrorMessage.required;
        if (!phone_number || phone_number.trim() === '') newErrors.phone_number = ErrorMessage.required;
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
            pathname: `dashboard/users/list`
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