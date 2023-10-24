import { ChangeEvent, useCallback, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { imageRegExp } from "../image-regexp";
import { toast } from "react-toastify";
import { ErrorMessage } from "../error";
import { IAdd } from "../../models/action.model";
import { uploadFile } from "../../slice/upload-file.slice";

function PopupHook<B>(initialValue: B, onHide?: () => void) {

    const [form, setForm] = useState<B>(initialValue);
    const [errors, setErrors] = useState({} as B);

    const dispatch = useAppDispatch();

    const setField = useCallback((field: string, value: any, isArray?: boolean) => {
        let formatedSelectedValue;
        if (isArray) {
            if (!!value.length) {
                formatedSelectedValue = value.map((el: any) => { return +el.id! });
            } else {
                formatedSelectedValue = (form as any)[field] || [];
                formatedSelectedValue.push(value);
            }
        } else {
            formatedSelectedValue = value
        }
        setForm({
            ...form,
            [field]: formatedSelectedValue
        })

    }, [form])
    const setFormArray = useCallback((field: string, value: any, index: number) => {
        (form as any)[field][index] = value;
        setForm({
            ...form
        })
    }, [form]);

    const deleteItemFormFormArray = useCallback((field: string, index: number) => {
        (form as any)[field].splice(index, 1);
        setForm({
            ...form
        })
    }, [form])

    const handleClose = (resetForm: () => void) => {
        setErrors({} as B);
        resetForm();
        onHide!();
    }

    const onFileChange = (e: ChangeEvent<any>, controlName: string) => {
        const files = (e.target as HTMLInputElement).files;
        if (!!files && files.length > 0) {
            const file = files[0];
            const fr = new FileReader();
            if (!imageRegExp(file)) {
                toast.error(ErrorMessage.formatError, {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }
            fr.onload = () => {
                if (typeof fr.result === 'string') {
                    setForm({
                        ...form,
                        file,
                        [controlName]: fr.result
                    });
                }
            };
            fr.readAsDataURL(file);

        }
    }
    const onUploadFile = (controlName: string, callback: (url: string) => void) => {
        const formData = new FormData();
        formData.append('file_url', (form as any).file, (form as any).file?.name);
        const sendingObject: IAdd<FormData> = {
            sendData: formData,
            createSuccessfully: (imageUrl: any) => {
                setForm({
                    ...form,
                    [controlName]: imageUrl
                });
                callback(imageUrl);
            }
        }
        dispatch(uploadFile(sendingObject))
    };
    return {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose,
        setFormArray,
        deleteItemFormFormArray,
        onUploadFile,
        onFileChange
    }
}
export default PopupHook;