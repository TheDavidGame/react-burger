import React from 'react';
import OrderDetailsStyles from './OrderDetails.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../domains/entity/index.entity";

const OrderDetails = () => {
    const orderNumber = useSelector((state: RootState) => state.order.orderNumber);
    return (
        <div className={OrderDetailsStyles.wrapper}>
            <p className="text text_type_digits-large mt-10">{orderNumber}</p>
            <p className="text text_type_main-medium mt-5 mb-5">идентификатор заказа</p>
            <img src={process.env.PUBLIC_URL + "/assets/done.svg"} alt="doneOrder"/>
            <p className="text text_type_main-small mt-10">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-1">Дождитесь готовности на орбитальной
                станции</p>
        </div>
    );
};

export default OrderDetails;
