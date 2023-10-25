import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser, UserDetail } from "../../models/user.model";
import { ErrorMessage } from "../../../../utils/error";
import { IAdd, IModify } from "../../../../models/action.model";
import { addUser, getUserDetails, modifyUser } from "../../slice/client.slice";
import { Roles } from "../../../../utils/roles";

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
                phone_number: user.phone_number
            }
            setForm({
                ...form,
                ...obj
            })
        }
    }, [user, params.id])

    const findFormErrors = () => {
        const { first_name, last_name, phone_number, email } = form;
        const newErrors = {} as IUser;
        if (!first_name || first_name.trim() === '') newErrors.first_name = ErrorMessage.required;
        if (!last_name || last_name.trim() === '') newErrors.last_name = ErrorMessage.required;
        if (!phone_number || phone_number.trim() === '') newErrors.phone_number = ErrorMessage.required;
        if (!email || email.trim() === '') newErrors.email = ErrorMessage.required;


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
                role: Roles.client,
                legal_type: 1,
                tin: '',
                company_name: '',
                birth_date: '2023-10-25T11:11:32.874Z',
                language: 'am',
                cover_image: '',
                avatar_image: ''
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
                dispatch(modifyUser(
                    sendingObject
                ));
            } else {
                const sendingObject: IAdd<IUser> = {
                    sendData: formObject,
                    createSuccessfully: handelOnSave
                }
                dispatch(addUser(
                    sendingObject
                ))
            }


        }
    }

    const handelOnSave = (): void => {
        resetForm();
        navigate({
            pathname: `/dashboard/users/list`
        });
    }

    const resetForm = () => {
        setForm({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: ''
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