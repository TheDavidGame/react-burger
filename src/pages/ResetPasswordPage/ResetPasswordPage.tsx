import React, {useState} from 'react';
import ResetPasswordPageStyle from './ResetPasswordPage.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {resetPassword} from "../../services/slices/ServerSlice";
import {AppDispatch} from "../../index";


const ResetPasswordPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password && token) {
            dispatch(resetPassword({password, token}));
            navigate('/login');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`mt-25 ${ResetPasswordPageStyle.wrapper}`}>
            <p className="text text_type_main-medium mb-6">
                Восстановление пароля
            </p>
            <PasswordInput
                placeholder={'Введите новый пароль'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                name={'password'}
                extraClass="mb-6"
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setToken(e.target.value)}
                value={token}
                name={'token'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
                Сохранить
            </Button>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Вспомнили пароль?
                <Link to='/login' className="ml-1">
                    Войти
                </Link>
            </p>
        </form>
    );
};

export default ResetPasswordPage;
