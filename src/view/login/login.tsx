import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { ErrorMessage } from "../../utils/error";
import { ILogin } from "./models/login.model";
import './login.scss';

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({} as ILogin);
    const dispatch = useAppDispatch();
    const setField = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const findFormErrors = (): ILogin => {
        const { username, password } = form;
        const newErrors: ILogin = {} as ILogin;
        if (!username || username === '') newErrors.username = ErrorMessage.required;
        if (!password || password === '') newErrors.password = ErrorMessage.required;

        return newErrors;
    }

    const handleSubmit = (e: any): void => {
        e.preventDefault();
        const { username, password } = form;
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            localStorage.setItem('access', 'res.data.access_token');
            goToDashboard();

            // dispatch(logIn({
            //     username,
            //     password,
            //     loggedInSuccessfully: () => { goToDashboard() }
            // }))

        }
    }
    const goToDashboard = (): void => {
        // dispatch(getCurrentUser());
        navigate('/dashboard', { replace: true });
    }
    return (
        <div>
            <Form style={{ width: '400px' }} className='form-item' onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Գաղտանուն</Form.Label>
                    <Form.Control
                        type='text'
                        onChange={e => setField('username', e.target.value)}
                        isInvalid={!!errors?.username}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors?.username}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Գաղտնաբառ</Form.Label>
                    <Form.Control
                        type='password'
                        onChange={e => setField('password', e.target.value)}
                        isInvalid={!!errors?.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors?.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button className="mt-4 btn-md w-100" type='submit'>Մուտք</Button>
            </Form>

        </div>
    )
}
export default Login;