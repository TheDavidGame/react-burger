import React, {useState, useRef} from 'react';
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyle from './BurgerIngredients.module.css';
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import type {BurgerIngredientsProps, BurgerIngredientType} from "../../domains/entity/index.entity";

const BurgerIngredients = ({ingredientsData}: BurgerIngredientsProps) => {
    const [currentTab, setCurrentTab] = useState('buns');

    const [selectedIngredient, setSelectedIngredient] = useState<BurgerIngredientType | null>(null);


    const categoriesRef = {
        buns: useRef<HTMLDivElement>(null),
        sauces: useRef<HTMLDivElement>(null),
        main: useRef<HTMLDivElement>(null),
    };

    const handleTabClick = (value: 'buns' | 'sauces' | 'main') => {
        setCurrentTab(value);
        scrollToCategory(value);
    };

    const scrollToCategory = (category: keyof typeof categoriesRef) => {
        const ref = categoriesRef[category];
        if (ref && ref.current) {
            ref.current.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    };

    return (
        <div>
            <p className="mt-5 text text_type_main-large">
                Соберите бургеры
            </p>
            <div className={BurgerIngredientsStyle.tabsContainer}>
                <Tab value="buns" active={currentTab === 'buns'} onClick={() => handleTabClick('buns')}>
                    Булки
                </Tab>
                <Tab value="sauces" active={currentTab === 'sauces'} onClick={() => handleTabClick('sauces')}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={() => handleTabClick('main')}>
                    Начинки
                </Tab>
            </div>
            <div className={BurgerIngredientsStyle.allColumnsContainer}>
                <div ref={categoriesRef.buns} className={BurgerIngredientsStyle.columnsContainer}>
                    <h3 className={`text text_type_main-medium ${BurgerIngredientsStyle.categoryTitle}`}>Булки</h3>
                    <div className={BurgerIngredientsStyle.ingredients}>
                        {ingredientsData
                            .filter(item => item.type === 'bun')
                            .map(item => (
                                <div key={item._id} className={BurgerIngredientsStyle.ingredientItem}
                                     onClick={() => setSelectedIngredient(item)}>
                                    <img src={item.image} alt={item.name}/>
                                    <Counter count={10} size="default" extraClass="m-1"/>
                                    <p className="text text_type_main-default">{item.name}</p>
                                    <div className={BurgerIngredientsStyle.priceItem}>
                                        <p className="t ext text_type_main-medium mr-1">{item.price}</p> <CurrencyIcon
                                        type="primary"/>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <div ref={categoriesRef.sauces} className={BurgerIngredientsStyle.columnsContainer}>
                    <h3 className={`text text_type_main-medium ${BurgerIngredientsStyle.categoryTitle}`}>Соусы</h3>
                    <div className={BurgerIngredientsStyle.ingredients}>
                        {ingredientsData
                            .filter(item => item.type === 'sauce')
                            .map(item => (
                                <div key={item._id} className={BurgerIngredientsStyle.ingredientItem}
                                     onClick={() => setSelectedIngredient(item)}>
                                    <img src={item.image} alt={item.name}/>
                                    <Counter count={10} size="default" extraClass="m-1"/>
                                    <p className="text text_type_main-default">{item.name}</p>
                                    <div className={BurgerIngredientsStyle.priceItem}>
                                        <p className="text text_type_main-medium mr-1">{item.price}</p> <CurrencyIcon
                                        type="primary"/>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <div ref={categoriesRef.main} className={BurgerIngredientsStyle.columnsContainer}>
                    <h3 className={`text text_type_main-medium ${BurgerIngredientsStyle.categoryTitle}`}>Начинки</h3>
                    <div className={BurgerIngredientsStyle.ingredients}>
                        {ingredientsData
                            .filter(item => item.type === 'main')
                            .map(item => (
                                <div key={item._id} className={BurgerIngredientsStyle.ingredientItem}
                                     onClick={() => setSelectedIngredient(item)}>
                                    <img src={item.image} alt={item.name}/>
                                    <Counter count={10} size="default" extraClass="m-1"/>
                                    <p className="text text_type_main-default">{item.name}</p>
                                    <div className={BurgerIngredientsStyle.priceItem}>
                                        <p className="text text_type_main-medium mr-1">{item.price}</p> <CurrencyIcon
                                        type="primary"/>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {selectedIngredient && (
                <Modal
                    isOpen={selectedIngredient !== null}
                    onClose={() => setSelectedIngredient(null)}
                    title="Детали ингредиента"
                >
                    <div>
                        <IngredientDetails selectedIngredient={selectedIngredient}/>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default BurgerIngredients;
