import React from 'react';
import IngredientDetailsStyles from './IngredientDetails.module.css';
import {IngredientDetailsProps} from "../../domains/entity/index.entity";

const IngredientDetails = ({selectedIngredient, showTitle}: IngredientDetailsProps) => {
    if (!selectedIngredient) return null;
    return (
        <div className={IngredientDetailsStyles.wrapper}>
            {showTitle ? (
                <p className="text text_type_main-large mt-20">
                    Детали ингредиента
                </p>
            ) : <></>}

            <img src={selectedIngredient.image} alt={selectedIngredient.name}
                 className={IngredientDetailsStyles.image}/>
            <p className={`text text_type_main-medium mt-4 mb-8 ${IngredientDetailsStyles.discription}`}>{selectedIngredient.name}</p>
            <div className={IngredientDetailsStyles.list}>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive text_type_digits-default">{selectedIngredient.calories}</p>
                </div>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default text_color_inactive">Белки,г</p>
                    <p className="text text_type_main-default text_color_inactive text_type_digits-default">{selectedIngredient.proteins}</p>
                </div>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default text_color_inactive">Жиры,г</p>
                    <p className="text text_type_main-default text_color_inactive text_type_digits-default">{selectedIngredient.fat}</p>
                </div>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы,г</p>
                    <p className="text text_type_main-default text_color_inactive text_type_digits-default">{selectedIngredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
};

export default IngredientDetails;
