import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from './AppHeader.module.css';
import {NavLink} from 'react-router-dom';

const AppHeader = () => {
    return (
        <header>
            <nav className={AppHeaderStyles.nav}>
                <div className={`p-1 ${AppHeaderStyles.rowColumn}`}>
                    <BurgerIcon type="secondary"/>
                    <NavLink to='/'
                             className={({isActive}) => `pl-3 mr-10 text text_type_main-default ${isActive ? '' : 'text_color_inactive'} ${AppHeaderStyles.link}`}>
                        Конструктор
                    </NavLink>

                    <ListIcon type="secondary"/>

                    <NavLink to='/profile/orders'
                             className={({isActive}) => `pl-3 text text_type_main-default ${isActive ? '' : 'text_color_inactive'} ${AppHeaderStyles.link}`}>
                        Лента заказов
                    </NavLink>
                </div>
                <div className="p-1">
                    <Logo/>
                </div>
                <div className={`p-1 ${AppHeaderStyles.rowColumn}`}>

                    <ProfileIcon type="secondary"/>

                    <NavLink to='/profile'
                             className={({isActive}) => `pl-3 text text_type_main-default ${isActive ? '' : 'text_color_inactive'} ${AppHeaderStyles.link}`}>
                        Личный кабинет
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
