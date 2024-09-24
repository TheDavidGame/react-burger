import {ReactNode} from "react";

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
    count: number;
}

export interface User {
    email: string;
    name: string;
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
    showTitle: boolean
}

export interface IngredientsState {
    items: BurgerIngredientType[];
}

export interface ConstructorIngredientsState {
    itemsConstructor: BurgerIngredientType[];
    bunsItem: BurgerIngredientType | null
}

export interface RootState {
    ingredients: IngredientsState;
    constructorIngredients: ConstructorIngredientsState;
    order: OrderState;
    forgotPassword: ForgotPasswordState;
    serverSlice: ServerSliceState;
}

export interface OrderState {
    orderNumber: number | null;
}

export interface ForgotPasswordState {
    successMessage: string | null;
}

export interface ServerSliceState {
    user: {} | null,
    accessToken: string | null,
    refreshToken: string | null,
    visitedForgotPassword: boolean,
}

export interface ProtectedRouteElementProps {
    children: ReactNode;
    redirectPath?: string;
}