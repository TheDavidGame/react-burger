import React from 'react';
import {Link} from 'react-router-dom';
import NotFound404Style from './NotFound404.module.css';

export const NotFound404 = () => {
    return (
        <div className={NotFound404Style.wrapper}>
            <p className="text text_type_digits-large">404</p>
            <br/>
            <Link to='/' className={NotFound404Style.link}>Перейти на главную страницу</Link>
        </div>
    );
};

export default NotFound404;