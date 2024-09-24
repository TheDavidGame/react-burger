import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/slices/Ingredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from '../Modal/Modal';
import {BurgerIngredientType, RootState} from "../../domains/entity/index.entity";
import {AppDispatch} from "../../index";

const IngredientPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const isFromList = location.state?.fromList;
    const {id} = useParams();
    const ingredientFromParams = useSelector((state: RootState) => state.ingredients.items.find(item => item._id === id));
    const [localSelectedIngredient, setLocalSelectedIngredient] = useState<BurgerIngredientType | null>(null);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (ingredientFromParams) {
            setLocalSelectedIngredient(ingredientFromParams);
        }
    }, [ingredientFromParams]);


    return (
        <div>
            {isFromList ? (
                localSelectedIngredient && (
                    <Modal
                        onClose={() => setLocalSelectedIngredient(null)}
                        title="Детали ингредиента"
                    >
                        <IngredientDetails selectedIngredient={localSelectedIngredient} showTitle={false}/>
                    </Modal>
                )
            ) : (
                localSelectedIngredient ? (
                    <IngredientDetails selectedIngredient={localSelectedIngredient} showTitle={true}/>
                ) : (
                    <h1>Ингредиент не найден</h1>
                )
            )}
        </div>
    );
};

export default IngredientPage;
