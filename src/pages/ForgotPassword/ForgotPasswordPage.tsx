import React, {useEffect, useState} from 'react';
import ForgotPasswordPageStyle from './ForgotPasswordPage.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {fetchForgotPassword} from "../../services/slices/ForgotPasswordSlice";
import {AppDispatch} from "../../index";
import {setVisitedForgotPassword} from "../../services/slices/ServerSlice";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(fetchForgotPassword(email));

        if (fetchForgotPassword.fulfilled.match(resultAction)) {
            navigate('/reset-password');
        }
    };


    useEffect(() => {
        dispatch(setVisitedForgotPassword());
    }, [dispatch]);

    return (
        <form onSubmit={handleSubmit} className={`mt-25 ${ForgotPasswordPageStyle.wrapper}`}>
            <p className="text text_type_main-medium mb-6">
                Восстановление пароля
            </p>
            <Input
                type={'text'}
                placeholder={'Укажите e-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"/>
            <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
                Восстановить
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

export default ForgotPasswordPage;
