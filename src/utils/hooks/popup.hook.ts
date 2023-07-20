import { useCallback, useState } from "react";
import { useAppDispatch } from "../../hooks";

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
    return {
        form,
        setForm,
        errors,
        setErrors,
        dispatch,
        setField,
        handleClose,
        setFormArray,
        deleteItemFormFormArray
    }
}
export default PopupHook;