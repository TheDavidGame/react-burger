import React, {useEffect, useState} from 'react';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {BurgerIngredientsProps} from "../../domains/entity/index.entity";

const BurgerConstructor = ({ingredientsData}: BurgerIngredientsProps) => {
    const [sumPrice, setSumPrice] = useState(0);

    const [openOrder, setOpenOrder] = useState(false);

    const saucesAndFillings = ingredientsData.filter(
        (ingredient) => ingredient.type === 'sauce' || ingredient.type === 'main'
    );

    useEffect(() => {
        let totalSum = 0;
        ingredientsData.forEach((ingredient) => {
            totalSum += ingredient.price;
        });
        setSumPrice(totalSum);
    }, [ingredientsData]);

    return (
        <div className='pt-15'>
            <div className="ml-7">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
            </div>

            <div className={BurgerConstructorStyles.ingredientItem}>

                {saucesAndFillings.map((ingredient =>
                        <div key={ingredient._id} className="mb-4 mt-4">
                            <span className="mr-2">
                                <DragIcon type="primary"/>
                            </span>
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                ))}
            </div>
            <div className="ml-7">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
            </div>
            <div className={`mt-5 ${BurgerConstructorStyles.order}`}>
                    <span className={`mr-10 ${BurgerConstructorStyles.priceFlex}`}>
                    <p className="text text_type_main-medium mr-2">{sumPrice} </p>
                    <CurrencyIcon type="primary"/>
                    </span>
                <Button htmlType="button" type="primary" size="medium" onClick={() => setOpenOrder(true)}>
                    Оформить заказ
                </Button>
            </div>
            {openOrder && (
                <Modal
                    isOpen={openOrder}
                    onClose={() => setOpenOrder(false)}
                    title={""}
                >
                    <div>
                        <OrderDetails/>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default BurgerConstructor;
