import React, {useEffect, useState} from 'react';
import ingredientsData from '../utils/data';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DeleteIcon,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {
    const [sumPrice, setSumPrice] = useState(0);

    useEffect(() => {
        let totalSum = 0;
        ingredientsData.forEach((ingredient) => {
            totalSum += ingredient.price;
        });
        setSumPrice(totalSum);
    }, []);

    return (
        <div className='pt-15'>
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
            <div className={BurgerConstructorStyles.ingredientItem}>


                {ingredientsData.map((ingredient =>
                        <div key={ingredient._id}>
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                ))}
            </div>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
            />
            <div className={`mt-5 ${BurgerConstructorStyles.order}`}>
                    <span className="mr-10" style={{display: 'flex'}}>
                    <p className="text text_type_main-medium mr-2">{sumPrice} </p>
                    <CurrencyIcon type="primary" style={{width: '24px'}}/>
                    </span>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;
