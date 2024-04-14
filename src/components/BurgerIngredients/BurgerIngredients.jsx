import React, { useState, useRef } from 'react';
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyle from './BurgerIngredients.module.css';
import ingredientsData from '../utils/data';

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = useState('buns');
    const categoriesRef = {
        buns: useRef(null),
        sauces: useRef(null),
        main: useRef(null),
    };

    const handleTabClick = (value) => {
        setCurrentTab(value);
        scrollToCategory(value);
    };

    const scrollToCategory = (category) => {
        const ref = categoriesRef[category];
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div>
            <p className="mt-5 text text_type_main-large" style={{ textAlign: 'left' }}>
                Соберите бургеры
            </p>
            <div className={BurgerIngredientsStyle.tabsContainer}>
                <Tab value="buns" active={currentTab === 'buns'} onClick={() => handleTabClick('buns')} >
                    Булки
                </Tab>
                <Tab value="sauces" active={currentTab === 'sauces'} onClick={() => handleTabClick('sauces')}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={() => handleTabClick('main')}>
                    Начинки
                </Tab>
            </div>

                <div ref={categoriesRef.buns} className={BurgerIngredientsStyle.columnsContainer}>
                    <h3 className={`text text_type_main-medium ${BurgerIngredientsStyle.categoryTitle}`}>Булки</h3>
                    <div className={BurgerIngredientsStyle.ingredients}>
                        {ingredientsData
                            .filter(item => item.type === 'bun')
                            .map(item => (
                                <div key={item._id} className={BurgerIngredientsStyle.ingredientItem}>
                                    <img src={item.image} alt={item.name} />
                                    <Counter count={10} size="default" extraClass="m-1" />
                                    <p className="text text_type_main-default">{item.name}</p>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <p className="t ext text_type_main-medium mr-1" >{item.price}</p> <CurrencyIcon type="primary" />
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
                                <div key={item._id} className={BurgerIngredientsStyle.ingredientItem}>
                                    <img src={item.image} alt={item.name} />
                                    <Counter count={10} size="default" extraClass="m-1" />
                                    <p className="text text_type_main-default">{item.name}</p>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <p className="text text_type_main-medium mr-1" >{item.price}</p> <CurrencyIcon type="primary" />
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
                                <div key={item._id} className={BurgerIngredientsStyle.ingredientItem}>
                                    <img src={item.image} alt={item.name} />
                                    <Counter count={10} size="default" extraClass="m-1" />
                                    <p className="text text_type_main-default">{item.name}</p>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <p className="text text_type_main-medium mr-1" >{item.price}</p> <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
        </div>
    );
};

export default BurgerIngredients;
