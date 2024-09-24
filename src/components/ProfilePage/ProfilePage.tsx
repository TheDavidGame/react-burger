import React, {useEffect, useState} from 'react';
import ProfilePageStyle from './ProfilePage.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../index";
import {fetchUserData, logoutUser, updateUserData} from "../../services/slices/ServerSlice";
import {User} from "../../domains/entity/index.entity";

const ProfilePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [initialValues, setInitialValues] = useState({name: '', email: '', password: ''});

    useEffect(() => {
        dispatch(fetchUserData()).then((action) => {
            if (fetchUserData.fulfilled.match(action)) {
                const userData: User = action.payload;
                setName(userData.name);
                setEmail(userData.email);
                setInitialValues({name: userData.name, email: userData.email, password: ''});
            }
        });
    }, [dispatch]);

    const hasChanges = () => (
        name !== initialValues.name || email !== initialValues.email || password !== initialValues.password
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUserData({name, email, password}));
        setInitialValues({name, email, password});
    };

    const handleCancel = () => {
        setName(initialValues.name);
        setEmail(initialValues.email);
        setPassword('');
    };

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <div className={`mt-25 ${ProfilePageStyle.wrapper}`}>
            <div className={`mr-15 mt-5 ${ProfilePageStyle.links}`}>
                <NavLink to='/profile'
                         className={({isActive}) => `text text_type_main-medium mb-6 ${isActive ? '' : 'text_color_inactive'} ${ProfilePageStyle.link}`}>
                    Профиль
                </NavLink>

                <NavLink to='/profile/orders'
                         className={({isActive}) => `text text_type_main-medium mb-6 ${isActive ? '' : 'text_color_inactive'} ${ProfilePageStyle.link}`}>
                    История заказов
                </NavLink>

                <p onClick={handleLogout}
                   className={`text text_type_main-medium text_color_inactive mb-30 ${ProfilePageStyle.link}`}>
                    Выход
                </p>
                <p className={`text text_type_main-default text_color_inactive ${ProfilePageStyle.description}`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        icon="EditIcon"
                        extraClass="mb-6"
                    />
                    <EmailInput
                        extraClass="mb-6"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        placeholder="Логин"
                        isIcon={true}
                    />
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        extraClass="mb-6"
                        icon="EditIcon"
                    />
                    {hasChanges() && (
                        <div className={`${ProfilePageStyle.buttons}`}>
                            <Button htmlType="button" type="secondary" size="large" extraClass="mb-20"
                                    onClick={handleCancel}>
                                Отмена
                            </Button>
                            <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
                                Сохранить
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
