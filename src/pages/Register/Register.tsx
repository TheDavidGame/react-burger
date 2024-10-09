import React, {useState} from 'react';
import RegisterStyle from './Register.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../index";
import {registerUser} from "../../services/slices/ServerSlice";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(registerUser({email, password, name}));

        if (registerUser.fulfilled.match(resultAction)) {
            navigate('/login');
        }
    };

    return (
            <form onSubmit={handleSubmit} className={`mt-25 ${RegisterStyle.wrapper}`}>
                <p className="text text_type_main-medium mb-6">
                    Регистрация
                </p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <EmailInput
                    extraClass="mb-6"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
                    Зарегистрироваться
                </Button>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    Уже зарегистрированы?
                    <Link to='/login' className="ml-1">
                        Войти
                    </Link>
                </p>
            </form>
    );
};

export default Register;
