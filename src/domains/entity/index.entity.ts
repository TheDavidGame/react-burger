export interface BurgerIngredientType {
    _id: string;
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

export interface BurgerIngredientsProps {
    ingredientsData: BurgerIngredientType[];
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export interface ModalOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export interface IngredientDetailsProps {
    selectedIngredient: BurgerIngredientType;
}