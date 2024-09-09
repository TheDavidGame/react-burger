import {configureStore} from "@reduxjs/toolkit";

export interface BurgerIngredientType {
    _id: string;
    uniqueId?: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
}

export interface ModalOverlayProps {
    onClose: () => void;
}

export interface ModalProps {
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export interface IngredientDetailsProps {
    selectedIngredient: BurgerIngredientType;
}

export interface IngredientsState {
    items: BurgerIngredientType[];
}

export interface ConstructorIngredientsState {
    itemsConstructor: BurgerIngredientType[];
    bunsItem: BurgerIngredientType | null
}

export interface IngredientInformationState {
    selectedIngredient: BurgerIngredientType | null;
}

export interface RootState {
    ingredients: IngredientsState;
    constructorIngredients: ConstructorIngredientsState;
    ingredientInformation: IngredientInformationState;
    order: OrderState;
}

export interface OrderState {
    orderNumber: number | null;
}