import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from './AppHeader.module.css';

const AppHeader = () => {
    return (
        <header>
            <nav className={AppHeaderStyles.nav}>
                <div className={`p-1 ${AppHeaderStyles.rowColumn}`}>
                    <BurgerIcon type="secondary" />
                    <p className="pl-3 mr-10 text text_type_main-default">
                        Конструктор
                    </p>

                    <ListIcon type="secondary" />
                    <p className="pl-3 text text_type_main-default">
                        Лента заказов
                    </p>
                </div>
                <div className="p-1">
                    <Logo />
                </div>
                <div className={`p-1 ${AppHeaderStyles.rowColumn}`}>
                    <ProfileIcon type="secondary" />
                    <p className="pl-3 text text_type_main-default">
                        Личный кабинет
                    </p>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
