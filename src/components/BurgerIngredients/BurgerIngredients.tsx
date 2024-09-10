import React, {useState, useRef, useEffect} from 'react';
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyle from './BurgerIngredients.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import type {BurgerIngredientType, RootState} from "../../domains/entity/index.entity";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/slices/Ingredients";
import {AppDispatch} from "../../index";
import {removeSelectedIngredient, setSelectedIngredient} from "../../services/slices/IngredientInformation";

const BurgerIngredients = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {items: ingredientsData} = useSelector((state: RootState) => state.ingredients);
    const {itemsConstructor, bunsItem} = useSelector((state: RootState) => state.constructorIngredients);
    const {selectedIngredient} = useSelector((state: RootState) => state.ingredientInformation);
    const [currentTab, setCurrentTab] = useState('buns');

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const categoriesRef = {
        buns: useRef<HTMLDivElement>(null),
        sauces: useRef<HTMLDivElement>(null),
        main: useRef<HTMLDivElement>(null),
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const handleScroll = () => {
        const containerTop = containerRef.current?.getBoundingClientRect().top || 0;
        const distances = Object.keys(categoriesRef).map(key => {
            const category = key as keyof typeof categoriesRef;
            const ref = categoriesRef[category].current;
            if (!ref) return {category, distance: Infinity};
            const distance = Math.abs(ref.getBoundingClientRect().top - containerTop);
            return {category, distance};
        });

        const closestCategory = distances.reduce((prev, curr) =>
            prev.distance < curr.distance ? prev : curr
        );

        setCurrentTab(closestCategory.category);
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

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleDragStart = (ingredient: BurgerIngredientType, event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('ingredient', JSON.stringify(ingredient));
    };

    const getIngredientCount = (ingredient: BurgerIngredientType) => {
        if (ingredient.type === 'bun' && bunsItem?._id === ingredient._id) {
            return bunsItem.count;
        }
        const matchingIngredients = itemsConstructor.filter(item => item._id === ingredient._id);
        return matchingIngredients.length;
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
            <div ref={containerRef} className={BurgerIngredientsStyle.allColumnsContainer} onScroll={handleScroll}>
                <div ref={categoriesRef.buns} className={BurgerIngredientsStyle.columnsContainer}>
                    <h3 className={`text text_type_main-medium ${BurgerIngredientsStyle.categoryTitle}`}>Булки</h3>
                    <div className={BurgerIngredientsStyle.ingredients}>
                        {ingredientsData
                            .filter((item: BurgerIngredientType) => item.type === 'bun')
                            .map((item: BurgerIngredientType) => (
                                <div draggable
                                     onDragStart={(event) => handleDragStart(item, event)}
                                     key={item._id}
                                     className={BurgerIngredientsStyle.ingredientItem}
                                     onClick={() => dispatch(setSelectedIngredient(item))}
                                >
                                    <img src={item.image} alt={item.name}/>
                                    <Counter count={getIngredientCount(item)} size="default" extraClass="m-1"/>
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
                            .filter((item: BurgerIngredientType) => item.type === 'sauce')
                            .map((item: BurgerIngredientType) => (
                                <div draggable
                                     onDragStart={(event) => handleDragStart(item, event)}
                                     key={item._id}
                                     className={BurgerIngredientsStyle.ingredientItem}
                                     onClick={() => dispatch(setSelectedIngredient(item))}
                                >
                                    <img src={item.image} alt={item.name}/>
                                    <Counter count={getIngredientCount(item)} size="default" extraClass="m-1"/>
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
                            .filter((item: BurgerIngredientType) => item.type === 'main')
                            .map((item: BurgerIngredientType) => (
                                <div draggable
                                     onDragStart={(event) => handleDragStart(item, event)}
                                     key={item._id}
                                     className={BurgerIngredientsStyle.ingredientItem}
                                     onClick={() => dispatch(setSelectedIngredient(item))}
                                >
                                    <img src={item.image} alt={item.name}/>
                                    <Counter count={getIngredientCount(item)} size="default" extraClass="m-1"/>
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
                    onClose={() => dispatch(removeSelectedIngredient())}
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
