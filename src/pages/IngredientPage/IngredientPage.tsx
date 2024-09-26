import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import {BurgerIngredientType, IngredientPageState, RootState} from "../../domains/entity/index.entity";

const IngredientPage = ({showTitle} : IngredientPageState) => {
    const {id} = useParams();
    const ingredientFromParams = useSelector((state: RootState) => state.ingredients.items.find(item => item._id === id));
    const [localSelectedIngredient, setLocalSelectedIngredient] = useState<BurgerIngredientType | null>(null);

    useEffect(() => {
        if (ingredientFromParams) {
            setLocalSelectedIngredient(ingredientFromParams);
        }
    }, [ingredientFromParams]);


    return (
        <div>
            {localSelectedIngredient ? (
                <IngredientDetails selectedIngredient={localSelectedIngredient} showTitle={showTitle}/>
            ) : (
                <h1>Ингредиент не найден</h1>
            )}
        </div>
    );
};

export default IngredientPage;
