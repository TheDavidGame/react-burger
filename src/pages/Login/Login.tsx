import React, {useState} from 'react';
import LoginStyle from './Login.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../index";
import {loginUser} from "../../services/slices/ServerSlice";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser({email, password}));

        if (loginUser.fulfilled.match(resultAction)) {
            const redirectPath = localStorage.getItem('redirectPath') || '/';
            localStorage.removeItem('redirectPath');
            navigate(redirectPath);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className={`mt-25 ${LoginStyle.wrapper}`}>
                <p className="text text_type_main-medium mb-6">
                    Вход
                </p>
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
                    Войти
                </Button>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    Вы - новый пользователь?
                    <Link to='/register' className="ml-1">
                        Зарегистрироваться
                    </Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                    <Link to='/forgot-password' className="ml-1">
                        Восстановить пароль
                    </Link>
                </p>
            </form>

        </div>
    );
};

export default Login;
