import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BurgerIngredientType, IngredientInformationState} from "../../domains/entity/index.entity";

const IngredientInformation = createSlice({
    name: 'ingredientInformation',
    initialState: {
        selectedIngredient: null,
    } as IngredientInformationState,
    reducers: {
        setSelectedIngredient: (state, action: PayloadAction<BurgerIngredientType>) => {
            state.selectedIngredient = action.payload;
        },

        removeSelectedIngredient: (state) => {
            state.selectedIngredient = null;
        }
    }
});

export const { setSelectedIngredient, removeSelectedIngredient } = IngredientInformation.actions;
export default IngredientInformation.reducer;