import React, {useEffect, useState} from 'react';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import Modal from '../Modal/Modal';
import OrderDetails from "../OrderDetails/OrderDetails";
import {useDispatch, useSelector} from "react-redux";
import {BurgerIngredientType, RootState} from "../../domains/entity/index.entity";
import {AppDispatch} from "../../index";
import {
    addBunsItem,
    addIngredientToConstructor,
    deleteIngredientToConstructor, reorderIngredients
} from "../../services/slices/ConstructorIngredients";
import {useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {fetchOrder} from "../../services/slices/Order";

const BurgerConstructor = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {itemsConstructor: ingredientsData} = useSelector((state: RootState) => state.constructorIngredients);
    const {bunsItem: bunsItem} = useSelector((state: RootState) => state.constructorIngredients);

    const [sumPrice, setSumPrice] = useState(0);

    const [openOrder, setOpenOrder] = useState(false);

    const [draggedIngredientIndex, setDraggedIngredientIndex] = useState<number | null>(null);
    const [hoveredIngredientIndex, setHoveredIngredientIndex] = useState<number | null>(null);

    useEffect(() => {
        let totalSum = 0;
        if (bunsItem) {
            totalSum += bunsItem.price * 2;
        }
        ingredientsData.forEach((ingredient) => {
            totalSum += ingredient.price;
        });
        setSumPrice(totalSum);
    }, [ingredientsData, bunsItem]);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const draggedIngredient = event.dataTransfer.getData('ingredient');

        if (draggedIngredient) {
            const ingredient = JSON.parse(draggedIngredient);
            const ingredientWithId = {
                ...ingredient,
                uniqueId: uuidv4(),
            };
            if (ingredient.type === 'bun') {
                dispatch(addBunsItem(ingredientWithId));
            } else {
                dispatch(addIngredientToConstructor(ingredientWithId));
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragStart = (index: number) => {
        setDraggedIngredientIndex(index);
    };

    const handleDragEnter = (index: number) => {
        setHoveredIngredientIndex(index);
    };

    const handleDragEnd = () => {
        if (draggedIngredientIndex !== null && hoveredIngredientIndex !== null) {
            dispatch(reorderIngredients({fromIndex: draggedIngredientIndex, toIndex: hoveredIngredientIndex}));
        }
        setDraggedIngredientIndex(null);
        setHoveredIngredientIndex(null);
    };

    const handleDelete = (ingredient: BurgerIngredientType) => {
        if (ingredient.uniqueId) {
            dispatch(deleteIngredientToConstructor(ingredient.uniqueId));
        }
    };

    const handleOrder = async () => {
        if (localStorage.getItem('accessToken')) {
            const ingredientIds = ingredientsData.map(ingredient => ingredient._id);
            if (bunsItem) {
                ingredientIds.push(bunsItem._id);
                ingredientIds.push(bunsItem._id);
            }
            await dispatch(fetchOrder(ingredientIds));
            setOpenOrder(true);
        } else {
            navigate('/login');
        }

    };
    return (
        <div className='pt-15' onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="ml-7">
                {bunsItem ? (
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bunsItem.name} (верх)`}
                        price={bunsItem.price}
                        thumbnail={bunsItem.image}
                    />
                ) : <div>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</div>}
            </div>

            <div className={BurgerConstructorStyles.ingredientItem}>

                {ingredientsData.filter(
                    (ingredient) => ingredient.type === 'sauce' || ingredient.type === 'main'
                ).map(((ingredient, index) =>
                        <div key={ingredient.uniqueId} className="mb-4 mt-4" draggable
                             onDragStart={() => handleDragStart(index)}
                             onDragEnter={() => handleDragEnter(index)}
                             onDragEnd={handleDragEnd}>
                            <span className="mr-2">
                                <DragIcon type="primary"/>
                            </span>
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                handleClose={() => handleDelete(ingredient)}
                                thumbnail={ingredient.image}
                            />
                        </div>
                ))}
            </div>
            <div className="ml-7">
                {bunsItem && (
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bunsItem.name} (низ)`}
                        price={bunsItem.price}
                        thumbnail={bunsItem.image}
                    />
                )}
            </div>

            <div className={`mt-5 ${BurgerConstructorStyles.order}`}>
                    <span className={`mr-10 ${BurgerConstructorStyles.priceFlex}`}>
                    <p className="text text_type_main-medium mr-2">{sumPrice} </p>
                    <CurrencyIcon type="primary"/>
                    </span>
                <Button htmlType="button" type="primary" size="medium" onClick={() => handleOrder()}>
                    Оформить заказ
                </Button>
            </div>
            {openOrder && (
                <Modal
                    onClose={() => setOpenOrder(false)}
                    title={""}
                >
                    <OrderDetails/>
                </Modal>
            )}
        </div>
    );
}

export default BurgerConstructor;
